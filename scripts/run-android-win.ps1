# Build Android no Windows com caminho curto (subst) para evitar erro MAX_PATH (260 chars).
# O Metro deve rodar em outro terminal com npm start (caminho real do projeto).
#
# Uso: npm run android:win

$ProjectRoot = (Resolve-Path "$PSScriptRoot\..").Path
$Drive = "S:"

function Remove-SubstDrive {
    cmd /c "subst $Drive /d" 2>$null | Out-Null
}

function Add-SubstDrive {
    Remove-SubstDrive
    cmd /c "subst $Drive `"$ProjectRoot`""
    if (-not (Test-Path "${Drive}\package.json")) {
        throw "Falha ao mapear $Drive. Verifique se a unidade S: esta livre."
    }
}

function Get-DeviceAbi {
    param([string]$Serial)

    $abi = (adb -s $Serial shell getprop ro.product.cpu.abi 2>$null).ToString().Trim()
    if ($abi) {
        return $abi
    }

    return "x86_64,arm64-v8a"
}

function Get-AndroidDevice {
    $lines = adb devices 2>$null | Select-Object -Skip 1
    foreach ($line in $lines) {
        if ($line -match '^(\S+)\s+device\s*$') {
            return $Matches[1]
        }
    }
    return $null
}

Remove-SubstDrive

Write-Host ""
Write-Host "=== ORDEM ==="
Write-Host "1. Terminal A: npm start"
Write-Host "2. Emulador Android Studio aberto (ou celular conectado)"
Write-Host "3. Terminal B: npm run android:win"
Write-Host ""

. "$ProjectRoot\scripts\android-env.ps1"
if (-not $env:ANDROID_HOME) {
    throw "ANDROID_HOME não configurado. Verifique scripts/android-env.ps1"
}

$serial = Get-AndroidDevice
if (-not $serial) {
    throw @"
Nenhum dispositivo Android detectado (adb devices).
Abra o emulador no Android Studio (Device Manager) ou conecte um celular com depuracao USB.
"@
}

Write-Host "Dispositivo: $serial"
$abi = Get-DeviceAbi -Serial $serial
Write-Host "Arquitetura alvo: $abi"
Write-Host "Mapeando ${Drive} -> $ProjectRoot (somente para o build Gradle)"
Add-SubstDrive

try {
    Push-Location "${Drive}\android"
    Write-Host "Compilando e instalando (gradlew app:installDebug)..."
    .\gradlew.bat app:installDebug -x lint "-PreactNativeArchitectures=$abi"
    if ($LASTEXITCODE -ne 0) {
        throw "Build Gradle falhou."
    }
    Pop-Location

    adb -s $serial reverse tcp:8081 tcp:8081 2>$null | Out-Null
    adb -s $serial shell am start -n com.samplescreen/.MainActivity
    Write-Host "App iniciado. Metro deve estar em execucao (npm start)."
} finally {
    if ((Get-Location).Path -like "${Drive}*") {
        Pop-Location -ErrorAction SilentlyContinue
    }
    Set-Location $ProjectRoot
    Remove-SubstDrive
    Write-Host "Drive ${Drive} desmapeado."
}
