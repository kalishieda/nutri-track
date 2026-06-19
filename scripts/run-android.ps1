# Build Android no Windows (caminho curto via subst) + instala no BlueStacks.
# NAO inicia Metro - rode npm start em outro terminal ANTES de abrir o app.
#
# Uso:
#   npm run android:win
#
# BlueStacks: Configuracoes > Avancado > Depuracao Android (ADB) = ON

param(
    [string]$BlueStacksAddress = "127.0.0.1:5555"
)

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

function Reset-AdbForBlueStacks {
    param([string]$Target)

    Write-Host "Reiniciando ADB e conectando BlueStacks..."
    adb kill-server 2>$null | Out-Null
    Start-Sleep -Seconds 2
    adb start-server | Out-Null

    adb devices | ForEach-Object {
        if ($_ -match '^(\S+)\s+device') {
            $existing = $Matches[1]
            if ($existing -ne $Target) {
                adb disconnect $existing 2>$null | Out-Null
            }
        }
    }

    adb disconnect $Target 2>$null | Out-Null
    adb connect $Target | Out-Host
    Start-Sleep -Seconds 3

    $pattern = [regex]::Escape($Target) + '\s+device'
    $online = adb devices | Select-String $pattern
    if (-not $online) {
        Write-Warning "BlueStacks offline em $Target. Ative ADB no BlueStacks."
        adb devices -l
        return $null
    }

    $env:ANDROID_SERIAL = $Target
    Write-Host "Dispositivo alvo: $Target"
    return $Target
}

function Install-And-Launch {
    param(
        [string]$Serial,
        [string]$ProjectDrive
    )

    $apk = Join-Path $ProjectDrive "android\app\build\outputs\apk\debug\app-debug.apk"
    if (-not (Test-Path $apk)) {
        throw "APK nao encontrado em $apk"
    }

    Write-Host "Instalando APK em $Serial..."
    adb -s $Serial install -r $apk
    if ($LASTEXITCODE -ne 0) {
        throw "Falha ao instalar APK."
    }

    adb -s $Serial reverse tcp:8081 tcp:8081 2>$null | Out-Null
    adb -s $Serial shell am start -n com.samplescreen/.MainActivity
    Write-Host "App iniciado. Metro deve estar rodando com: npm start"
}

Remove-SubstDrive
Write-Host ""
Write-Host "=== ORDEM CORRETA ==="
Write-Host "1. Terminal A: npm start          (Metro no caminho C:, aguarde 'Dev server ready')"
Write-Host "2. Terminal B: npm run android:win  (este script - build + instala)"
Write-Host ""

. "$ProjectRoot\scripts\android-env.ps1"

$serial = Reset-AdbForBlueStacks -Target $BlueStacksAddress
if (-not $serial) {
    throw "Nenhum dispositivo BlueStacks disponivel."
}

Write-Host "Mapeando ${Drive} -> $ProjectRoot (somente para o build Gradle)"
Add-SubstDrive

try {
    Push-Location "${Drive}\android"
    Write-Host "Compilando APK (gradlew assembleDebug)..."
    .\gradlew.bat app:assembleDebug -x lint
    if ($LASTEXITCODE -ne 0) {
        throw "Build Gradle falhou."
    }
    Pop-Location

    Install-And-Launch -Serial $serial -ProjectDrive $Drive
} finally {
    if ((Get-Location).Path -like "${Drive}*") {
        Pop-Location -ErrorAction SilentlyContinue
    }
    Set-Location $ProjectRoot
    Remove-SubstDrive
    Write-Host "Drive ${Drive} desmapeado."
}
