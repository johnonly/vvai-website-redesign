# Quick Deploy Script - Restores all recent updates and deploys
# Use this to restore Contact, About, TOS, and Privacy Policy updates

Write-Host "🚀 Quick Deploy - Restoring Recent Updates" -ForegroundColor Cyan
Write-Host ""

Set-Location "d:\_vvai redesign\vvai-website"
$gitPath = "C:\Program Files\Git\bin\git.exe"

# Verify message files are current
Write-Host "✅ Verifying message files..." -ForegroundColor Yellow
$files = @(
    "messages\en.json",
    "messages\zh.json",
    "messages\zh-tw.json"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        Write-Host "  ✓ $file ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file MISSING!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📋 Recent updates included:" -ForegroundColor Cyan
Write-Host "  • Contact Page - Complete with form and company info" -ForegroundColor White
Write-Host "  • About/Story Page - Mission, timeline, and values" -ForegroundColor White
Write-Host "  • Terms of Service - 15 sections (Updated March 2025)" -ForegroundColor White
Write-Host "  • Privacy Policy - 11 sections (Updated July 2025)" -ForegroundColor White
Write-Host ""

# Run the main deployment script
Write-Host "🚀 Initiating deployment..." -ForegroundColor Yellow
& ".\deploy.ps1" -message "Restore recent updates: Contact, About, TOS, and Privacy Policy"
