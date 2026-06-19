# Limpa caches do Metro/Haste que causam erro SHA-1 apos uso do subst S:
param(
    [string]$ProjectRoot = (Resolve-Path "$PSScriptRoot\..").Path
)

Write-Host "Removendo drive virtual S: (se existir)..."
cmd /c "subst S: /d" 2>$null | Out-Null

$paths = @(
    (Join-Path $ProjectRoot "node_modules\.cache"),
    (Join-Path $env:TEMP "metro-cache"),
    (Join-Path $env:TEMP "haste-map-*"),
    (Join-Path $env:TEMP "react-*")
)

foreach ($p in $paths) {
    Get-Item $p -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    Get-ChildItem (Split-Path $p -Parent) -Filter (Split-Path $p -Leaf) -ErrorAction SilentlyContinue |
        Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Cache Metro limpo."
