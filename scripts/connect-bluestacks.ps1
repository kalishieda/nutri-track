# Conecta o BlueStacks via ADB.
# Ative em BlueStacks: Configurações > Avançado > Depuração Android (ADB).
# Uso: . .\scripts\connect-bluestacks.ps1

param(
    [string]$Address = "127.0.0.1:5555"
)

. "$PSScriptRoot\android-env.ps1"

Write-Host "Conectando BlueStacks em $Address..."
adb disconnect $Address 2>$null | Out-Null
adb connect $Address

Start-Sleep -Seconds 2
Write-Host "`nDispositivos conectados:"
adb devices -l

$online = adb devices | Select-String "$Address\s+device"
if (-not $online) {
    Write-Warning @"
BlueStacks não apareceu como 'device'.

Checklist:
  1. BlueStacks aberto
  2. Configurações > Avançado > Depuração Android (ADB) = ATIVADO
  3. Tente outra porta: . .\scripts\connect-bluestacks.ps1 -Address 127.0.0.1:5556
"@
}
