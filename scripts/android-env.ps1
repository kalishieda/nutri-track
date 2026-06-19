# Configura JAVA_HOME, ANDROID_HOME e PATH para esta sessão do PowerShell.
# Uso: . .\scripts\android-env.ps1

$jdkCandidates = @(
    "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot",
    "C:\Program Files\Android\Android Studio\jbr"
)

$env:JAVA_HOME = $jdkCandidates | Where-Object { Test-Path "$_\bin\java.exe" } | Select-Object -First 1
if (-not $env:JAVA_HOME) {
    Write-Error "JDK 17+ não encontrado. Instale: winget install Microsoft.OpenJDK.17"
    return
}

$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME

$pathsToAdd = @(
    "$env:JAVA_HOME\bin",
    "$env:ANDROID_HOME\platform-tools",
    "$env:ANDROID_HOME\cmdline-tools\latest\bin"
)

if (Test-Path "$env:ANDROID_HOME\emulator") {
    $pathsToAdd += "$env:ANDROID_HOME\emulator"
}

foreach ($p in $pathsToAdd) {
    if (Test-Path $p) {
        $env:Path = ($env:Path -split ';' | Where-Object { $_ -and $_ -ne $p }) -join ';'
        $env:Path = "$p;$env:Path"
    }
}

Write-Host "JAVA_HOME=$env:JAVA_HOME"
Write-Host "ANDROID_HOME=$env:ANDROID_HOME"
java -version
adb version

$emulator = "$env:ANDROID_HOME\emulator\emulator.exe"
if (Test-Path $emulator) {
    $avds = & $emulator -list-avds 2>$null
    if ($avds) {
        Write-Host "Emuladores Android Studio:"
        $avds | ForEach-Object { Write-Host "  - $_" }
    }
} else {
    Write-Host "Emulador Android Studio não instalado (ok se usar BlueStacks/celular)."
}
