param(
    [string]$DestinationRoot = 'D:\VSCode-Transfer',
    [switch]$Move,
    [switch]$SkipStable,
    [switch]$SkipInsiders
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

function Get-UninstallInstallLocations {
    $registryPaths = @(
        'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*',
        'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*',
        'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*'
    )

    $locations = @()

    foreach ($registryPath in $registryPaths) {
        $entries = @(Get-ItemProperty -Path $registryPath -ErrorAction SilentlyContinue)
        foreach ($entry in $entries) {
            $displayNameProperty = $entry.PSObject.Properties['DisplayName']
            $installLocationProperty = $entry.PSObject.Properties['InstallLocation']

            if (-not $displayNameProperty -or -not $installLocationProperty) {
                continue
            }

            $displayName = [string]$displayNameProperty.Value
            $installLocation = [string]$installLocationProperty.Value

            if ($displayName -match '^Microsoft Visual Studio Code( Insiders)?$' -and $installLocation) {
                $locations += $installLocation
            }
        }
    }

    return $locations | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Sort-Object -Unique
}

function Get-CopyTargets {
    param([bool]$WantStable, [bool]$WantInsiders)

    $appDataRoaming = [Environment]::GetFolderPath('ApplicationData')
    $appDataLocal = [Environment]::GetFolderPath('LocalApplicationData')
    $profile = $HOME

    $targets = New-Object System.Collections.Generic.List[object]

    if ($WantStable) {
        $targets.Add([pscustomobject]@{ Label = 'VSCode user data'; Source = Join-Path $appDataRoaming 'Code'; Category = 'stable' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode local state'; Source = Join-Path $appDataLocal 'Code'; Category = 'stable' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode extensions'; Source = Join-Path $profile '.vscode\extensions'; Category = 'stable' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode install (user)'; Source = Join-Path $appDataLocal 'Programs\Microsoft VS Code'; Category = 'stable' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode install (system)'; Source = Join-Path ${env:ProgramFiles} 'Microsoft VS Code'; Category = 'stable' })
        if (${env:ProgramFiles(x86)}) {
            $targets.Add([pscustomobject]@{ Label = 'VSCode install (system x86)'; Source = Join-Path ${env:ProgramFiles(x86)} 'Microsoft VS Code'; Category = 'stable' })
        }
    }

    if ($WantInsiders) {
        $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders user data'; Source = Join-Path $appDataRoaming 'Code - Insiders'; Category = 'insiders' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders local state'; Source = Join-Path $appDataLocal 'Code - Insiders'; Category = 'insiders' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders extensions'; Source = Join-Path $profile '.vscode-insiders\extensions'; Category = 'insiders' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders install (user)'; Source = Join-Path $appDataLocal 'Programs\Microsoft VS Code Insiders'; Category = 'insiders' })
        $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders install (system)'; Source = Join-Path ${env:ProgramFiles} 'Microsoft VS Code Insiders'; Category = 'insiders' })
        if (${env:ProgramFiles(x86)}) {
            $targets.Add([pscustomobject]@{ Label = 'VSCode Insiders install (system x86)'; Source = Join-Path ${env:ProgramFiles(x86)} 'Microsoft VS Code Insiders'; Category = 'insiders' })
        }
    }

    foreach ($path in Get-UninstallInstallLocations) {
        $category = if ($path -like '*Insiders*') { 'insiders' } else { 'stable' }
        if (($category -eq 'stable' -and $WantStable) -or ($category -eq 'insiders' -and $WantInsiders)) {
            $targets.Add([pscustomobject]@{ Label = "Install from registry - $(Split-Path -Path $path -Leaf)"; Source = $path; Category = $category })
        }
    }

    return $targets |
        Where-Object { $_.Source -and (Test-Path -LiteralPath $_.Source) } |
        Sort-Object Source -Unique
}

function Copy-Tree {
    param(
        [string]$Source,
        [string]$Destination,
        [switch]$RemoveSource
    )

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

    if ($RemoveSource) {
        Remove-Item -LiteralPath $Source -Recurse -Force
    }
}

function Export-ExtensionInventory {
    param(
        [string]$ExecutablePath,
        [string]$OutputFile
    )

    if (-not (Test-Path -LiteralPath $ExecutablePath)) {
        return $false
    }

    $extensions = & $ExecutablePath --list-extensions --show-versions 2>$null
    if ($LASTEXITCODE -ne 0) {
        return $false
    }

    Set-Content -LiteralPath $OutputFile -Value $extensions -Encoding UTF8
    return $true
}

function Convert-ToSafeFolderName {
    param([string]$Value)

    return (($Value -replace '[\\/:*?"<>|]', '') -replace '\s+', '-')
}

$wantStable = -not [bool]$SkipStable
$wantInsiders = -not [bool]$SkipInsiders

if (-not $wantStable -and -not $wantInsiders) {
    throw 'Nothing selected. Remove -SkipStable or -SkipInsiders so at least one VS Code channel is included.'
}

New-DirectoryIfMissing -Path $DestinationRoot

$timestamp = Get-Date -Format 'yyyy-MM-dd_HHmmss'
$backupRoot = Join-Path $DestinationRoot "vscode-backup-$timestamp"
New-DirectoryIfMissing -Path $backupRoot

$manifest = [ordered]@{
    createdAt = (Get-Date).ToString('o')
    computerName = $env:COMPUTERNAME
    userName = $env:USERNAME
    mode = if ($Move) { 'move' } else { 'copy' }
    destination = $backupRoot
    notes = @(
        'User data includes settings, keybindings, snippets, local history, workspace storage, and global storage.',
        'GitHub Copilot Chat history is generally stored under workspaceStorage and globalStorage in the VS Code user-data folders.',
        'Extensions are copied as folders and, when possible, exported as a versioned list.'
    )
    copiedItems = @()
    missingItems = @()
    extensionInventories = @()
}

$targets = @(Get-CopyTargets -WantStable:$wantStable -WantInsiders:$wantInsiders)

if (-not $targets.Count) {
    throw 'No matching VS Code folders were found on this machine.'
}

$stableExeCandidates = @(
    (Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'Programs\Microsoft VS Code\Code.exe'),
    (Join-Path ${env:ProgramFiles} 'Microsoft VS Code\Code.exe'),
    $(if (${env:ProgramFiles(x86)}) { Join-Path ${env:ProgramFiles(x86)} 'Microsoft VS Code\Code.exe' })
) | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Select-Object -Unique

$insidersExeCandidates = @(
    (Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'Programs\Microsoft VS Code Insiders\Code - Insiders.exe'),
    (Join-Path ${env:ProgramFiles} 'Microsoft VS Code Insiders\Code - Insiders.exe'),
    $(if (${env:ProgramFiles(x86)}) { Join-Path ${env:ProgramFiles(x86)} 'Microsoft VS Code Insiders\Code - Insiders.exe' })
) | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Select-Object -Unique

if ($wantStable -and $stableExeCandidates) {
    $outputFile = Join-Path $backupRoot 'vscode-extensions.txt'
    if (Export-ExtensionInventory -ExecutablePath $stableExeCandidates[0] -OutputFile $outputFile) {
        $manifest.extensionInventories += [ordered]@{ channel = 'stable'; file = $outputFile }
    }
}

if ($wantInsiders -and $insidersExeCandidates) {
    $outputFile = Join-Path $backupRoot 'vscode-insiders-extensions.txt'
    if (Export-ExtensionInventory -ExecutablePath $insidersExeCandidates[0] -OutputFile $outputFile) {
        $manifest.extensionInventories += [ordered]@{ channel = 'insiders'; file = $outputFile }
    }
}

Write-Section "Backing up VS Code data to $backupRoot"

foreach ($target in $targets) {
    $categoryFolder = if ($target.Category -eq 'insiders') { 'VSCode-Insiders' } else { 'VSCode' }
    $destinationLeaf = Convert-ToSafeFolderName -Value $target.Label
    $destination = Join-Path (Join-Path $backupRoot $categoryFolder) $destinationLeaf
    Write-Host "Copying $($target.Label): $($target.Source)"
    Copy-Tree -Source $target.Source -Destination $destination -RemoveSource:$Move

    $manifest.copiedItems += [ordered]@{
        label = $target.Label
        source = $target.Source
        destination = $destination
    }
}

$manifestPath = Join-Path $backupRoot 'manifest.json'
$manifest | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $manifestPath -Encoding UTF8

Write-Section 'Complete'
Write-Host "Backup saved to: $backupRoot" -ForegroundColor Green
Write-Host 'Important: close VS Code and VS Code Insiders before running for the most complete history and state copy.' -ForegroundColor Yellow
Write-Host 'If you want to remove the originals after copying, rerun with -Move.' -ForegroundColor Yellow