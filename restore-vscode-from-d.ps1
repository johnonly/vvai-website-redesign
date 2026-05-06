param(
    [string]$BackupRoot = 'D:\VSCode-Transfer',
    [string]$BackupFolder,
    [switch]$SkipStable,
    [switch]$SkipInsiders,
    [switch]$SkipInstall,
    [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Section {
    param([string]$Message)
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function New-DirectoryIfMissing {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Convert-ToSafeFolderName {
    param([string]$Value)

    return (($Value -replace '[\\/:*?"<>|]', '') -replace '\s+', '-')
}

function Get-EnvironmentPath {
    param([string]$VariableName)

    return [Environment]::GetEnvironmentVariable($VariableName)
}

function Resolve-BackupFolder {
    param(
        [string]$BaseRoot,
        [string]$NamedFolder
    )

    if ($NamedFolder) {
        if (Test-Path -LiteralPath $NamedFolder) {
            return (Resolve-Path -LiteralPath $NamedFolder).Path
        }

        $candidate = Join-Path $BaseRoot $NamedFolder
        if (Test-Path -LiteralPath $candidate) {
            return (Resolve-Path -LiteralPath $candidate).Path
        }

        throw "Backup folder not found: $NamedFolder"
    }

    if (-not (Test-Path -LiteralPath $BaseRoot)) {
        throw "Backup root not found: $BaseRoot"
    }

    $latest = Get-ChildItem -LiteralPath $BaseRoot -Directory |
        Where-Object { $_.Name -like 'vscode-backup-*' } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1

    if (-not $latest) {
        throw "No backup folders matching 'vscode-backup-*' were found under $BaseRoot"
    }

    return $latest.FullName
}

function Read-Manifest {
    param([string]$Folder)

    $manifestPath = Join-Path $Folder 'manifest.json'
    if (-not (Test-Path -LiteralPath $manifestPath)) {
        return $null
    }

    return Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
}

function Copy-Tree {
    param(
        [string]$Source,
        [string]$Destination
    )

    if (-not (Test-Path -LiteralPath $Source)) {
        return $false
    }

    New-DirectoryIfMissing -Path $Destination

    $robocopyArgs = @(
        $Source,
        $Destination,
        '/E',
        '/COPY:DAT',
        '/DCOPY:DAT',
        '/R:1',
        '/W:1',
        '/XJ',
        '/NFL',
        '/NDL',
        '/NP'
    )

    & robocopy @robocopyArgs | Out-Host
    $exitCode = $LASTEXITCODE

    if ($exitCode -ge 8) {
        throw "Robocopy failed for '$Source' with exit code $exitCode"
    }

    return $true
}

function Get-RestoreTargets {
    param([bool]$WantStable, [bool]$WantInsiders)

    $appDataRoaming = [Environment]::GetFolderPath('ApplicationData')
    $appDataLocal = [Environment]::GetFolderPath('LocalApplicationData')
    $programFiles = Get-EnvironmentPath -VariableName 'ProgramFiles'
    $programFilesX86 = Get-EnvironmentPath -VariableName 'ProgramFiles(x86)'
    $profile = $HOME

    $targets = New-Object System.Collections.Generic.List[object]

    if ($WantStable) {
        $targets.Add([pscustomobject]@{ Label = 'VSCode user data'; Destination = Join-Path $appDataRoaming 'Code'; Category = 'stable'; Kind = 'data' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode local state'; Destination = Join-Path $appDataLocal 'Code'; Category = 'stable'; Kind = 'data' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode extensions'; Destination = Join-Path $profile '.vscode\extensions'; Category = 'stable'; Kind = 'data' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode install (user)'; Destination = Join-Path $appDataLocal 'Programs\Microsoft VS Code'; Category = 'stable'; Kind = 'install' })
        if ($programFiles) {
            $targets.Add([pscustomobject]@{ Label = 'VSCode install (system)'; Destination = Join-Path $programFiles 'Microsoft VS Code'; Category = 'stable'; Kind = 'install' })
        }
        if ($programFilesX86) {
            $targets.Add([pscustomobject]@{ Label = 'VSCode install (system x86)'; Destination = Join-Path $programFilesX86 'Microsoft VS Code'; Category = 'stable'; Kind = 'install' })
        }
    }

    if ($WantInsiders) {
        $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders user data'; Destination = Join-Path $appDataRoaming 'Code - Insiders'; Category = 'insiders'; Kind = 'data' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders local state'; Destination = Join-Path $appDataLocal 'Code - Insiders'; Category = 'insiders'; Kind = 'data' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders extensions'; Destination = Join-Path $profile '.vscode-insiders\extensions'; Category = 'insiders'; Kind = 'data' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders install (user)'; Destination = Join-Path $appDataLocal 'Programs\Microsoft VS Code Insiders'; Category = 'insiders'; Kind = 'install' })
        if ($programFiles) {
            $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders install (system)'; Destination = Join-Path $programFiles 'Microsoft VS Code Insiders'; Category = 'insiders'; Kind = 'install' })
        }
        if ($programFilesX86) {
            $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders install (system x86)'; Destination = Join-Path $programFilesX86 'Microsoft VS Code Insiders'; Category = 'insiders'; Kind = 'install' })
        }
    }

    return $targets
}

function Confirm-OverwriteIfNeeded {
    param(
        [string]$Path,
        [string]$Label,
        [bool]$AllowForce
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        return
    }

    if ($AllowForce) {
        return
    }

    throw "Destination already exists for ${Label}: $Path. Re-run with -Force to merge/overwrite into the existing destination."
}

$wantStable = -not [bool]$SkipStable
$wantInsiders = -not [bool]$SkipInsiders

if (-not $wantStable -and -not $wantInsiders) {
    throw 'Nothing selected. Remove -SkipStable or -SkipInsiders so at least one VS Code channel is restored.'
}

$resolvedBackupFolder = Resolve-BackupFolder -BaseRoot $BackupRoot -NamedFolder $BackupFolder
$manifest = Read-Manifest -Folder $resolvedBackupFolder

$targets = @(Get-RestoreTargets -WantStable:$wantStable -WantInsiders:$wantInsiders)
$results = New-Object System.Collections.Generic.List[object]

Write-Section "Restoring VS Code data from $resolvedBackupFolder"
Write-Host 'Close VS Code and VS Code Insiders before restoring to avoid partial state restoration.' -ForegroundColor Yellow

foreach ($target in $targets) {
    if ($SkipInstall -and $target.Kind -eq 'install') {
        continue
    }

    $categoryFolder = if ($target.Category -eq 'insiders') { 'VSCode-Insiders' } else { 'VSCode' }
    $sourceLeaf = Convert-ToSafeFolderName -Value $target.Label
    $source = Join-Path (Join-Path $resolvedBackupFolder $categoryFolder) $sourceLeaf

    if (-not (Test-Path -LiteralPath $source)) {
        continue
    }

    Confirm-OverwriteIfNeeded -Path $target.Destination -Label $target.Label -AllowForce:[bool]$Force

    Write-Host "Restoring $($target.Label): $source -> $($target.Destination)"
    $copied = Copy-Tree -Source $source -Destination $target.Destination

    if ($copied) {
        $results.Add([pscustomobject]@{
            label = $target.Label
            source = $source
            destination = $target.Destination
            kind = $target.Kind
        })
    }
}

$reportPath = Join-Path $resolvedBackupFolder 'restore-report.json'
$manifestCreatedAt = $null
if ($manifest) {
    $createdAtProperty = $manifest.PSObject.Properties['createdAt']
    if ($createdAtProperty) {
        $manifestCreatedAt = $createdAtProperty.Value
    }
}

[ordered]@{
    restoredAt = (Get-Date).ToString('o')
    restoredOnComputer = $env:COMPUTERNAME
    restoredForUser = $env:USERNAME
    backupFolder = $resolvedBackupFolder
    manifestCreatedAt = $manifestCreatedAt
    skipInstall = [bool]$SkipInstall
    usedForce = [bool]$Force
    restoredItems = $results
} | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $reportPath -Encoding UTF8

Write-Section 'Complete'
Write-Host "Restore report saved to: $reportPath" -ForegroundColor Green
Write-Host 'If Program Files destinations were involved, run PowerShell as Administrator.' -ForegroundColor Yellow
Write-Host 'If you only want profile data, rerun with -SkipInstall.' -ForegroundColor Yellow