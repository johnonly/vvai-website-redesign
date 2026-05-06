# V V AI Website - Automated Deployment Script
# This script commits changes and pushes to GitHub, triggering Vercel deployment

param(
    [string]$message = "Update website content"
)

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  V V AI - Automated Deployment" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Set Git executable path
$gitPath = "C:\Program Files\Git\bin\git.exe"
Set-Location "d:\_vvai redesign\vvai-website"

# Check for uncommitted changes
Write-Host "🔍 Checking for changes..." -ForegroundColor Yellow
$status = & $gitPath status --short
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "✅ No changes to deploy" -ForegroundColor Green
    exit 0
}

Write-Host "📝 Found changes:" -ForegroundColor Yellow
Write-Host $status
Write-Host ""

# Stage all changes
Write-Host "📦 Staging changes..." -ForegroundColor Yellow
& $gitPath add -A

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
$commitMessage = if ($message) { $message } else { "Update website content - $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }
& $gitPath commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Commit failed" -ForegroundColor Red
    exit 1
}

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
& $gitPath push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "✅ Deployment initiated successfully!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Vercel will automatically deploy your changes." -ForegroundColor Cyan
Write-Host "📊 Monitor deployment: https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host "🔗 Repository: https://github.com/johnonly/vvai-website-redesign" -ForegroundColor Cyan
Write-Host ""
