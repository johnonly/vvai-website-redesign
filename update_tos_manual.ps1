# Update TOS in all message files from tos.md

$ErrorActionPreference = "Stop"

# Read the TOS markdown file
$tosPath = "d:\_vvai redesign\vvai-website\_project docs\tos.md"
$tosContent = Get-Content -Path $tosPath -Raw -Encoding UTF8

# Define section boundaries for English (approximately)
$enStart = 0
$enEnd = $tosContent.IndexOf("`n服务协议`n")
$englishContent = $tosContent.Substring($enStart, $enEnd)

Write-Host "Extracted English TOS content ($($englishContent.Length) chars)"
Write-Host "`nFirst 500 chars:"
Write-Host $englishContent.Substring(0, [Math]::Min(500, $englishContent.Length))
Write-Host "`n---"

# Now I'll manually build the JSON structure
Write-Host "`nPlease use the Node.js script approach or manual replacement via replace_string_in_file tool."
Write-Host "The PowerShell string handling may corrupt UTF-8 encoding."
