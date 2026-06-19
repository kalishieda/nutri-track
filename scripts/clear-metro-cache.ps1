# Limpa caches do Metro/Haste.
param(
    [string]$ProjectRoot = (Resolve-Path "$PSScriptRoot\..").Path
)

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
