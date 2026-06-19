# Inicia Metro na raiz do projeto.
# Uso: npm start

param(
    [switch]$ResetCache
)

$ProjectRoot = (Resolve-Path "$PSScriptRoot\..").Path

. "$PSScriptRoot\clear-metro-cache.ps1" -ProjectRoot $ProjectRoot

function Stop-MetroOnPort {
    param([int]$Port = 8081)

    $pids = @()
    try {
        $pids = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction Stop |
            Select-Object -ExpandProperty OwningProcess -Unique
    } catch {
        netstat -ano | ForEach-Object {
            if ($_.Line -match ":$Port\s+.*LISTENING\s+(\d+)\s*$") {
                $pids += [int]$Matches[1]
            }
        }
        $pids = $pids | Select-Object -Unique
    }

    foreach ($oldPid in $pids) {
        if ($oldPid -gt 0) {
            Write-Host "Encerrando processo na porta $Port (PID $oldPid)..."
            taskkill /F /PID $oldPid 2>$null | Out-Null
        }
    }

    if ($pids.Count -gt 0) {
        Start-Sleep -Seconds 1
    }
}

Stop-MetroOnPort -Port 8081

Set-Location $ProjectRoot

$metroArgs = @("start")
if ($ResetCache) {
    $metroArgs += "--reset-cache"
}

Write-Host "Metro em: $ProjectRoot"
npx react-native @metroArgs @args
