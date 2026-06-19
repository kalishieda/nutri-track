# Instala Android SDK cmdline-tools, aceita licenças e pacotes necessários.
# Uso: .\scripts\setup-android-sdk.ps1

$ErrorActionPreference = "Stop"
$sdkRoot = "$env:LOCALAPPDATA\Android\Sdk"
$cmdlineDir = "$sdkRoot\cmdline-tools\latest"
$sdkmanager = "$cmdlineDir\bin\sdkmanager.bat"

New-Item -ItemType Directory -Force -Path $cmdlineDir | Out-Null

if (-not (Test-Path $sdkmanager)) {
    Write-Host "Baixando Android command-line tools..."
    $zip = "$env:TEMP\android-cmdline-tools.zip"
    $extract = "$env:TEMP\android-cmdline-tools"
    $url = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"

    Invoke-WebRequest -Uri $url -OutFile $zip
    if (Test-Path $extract) { Remove-Item $extract -Recurse -Force }
    Expand-Archive -Path $zip -DestinationPath $extract -Force

    Get-ChildItem "$extract\cmdline-tools" | Copy-Item -Destination $cmdlineDir -Recurse -Force
    Remove-Item $zip -Force -ErrorAction SilentlyContinue
    Remove-Item $extract -Recurse -Force -ErrorAction SilentlyContinue
}

$env:ANDROID_HOME = $sdkRoot
$env:ANDROID_SDK_ROOT = $sdkRoot
$env:JAVA_HOME = if (Test-Path "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot\bin\java.exe") {
    "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
} else {
    $env:JAVA_HOME
}

Write-Host "Aceitando licenças do Android SDK..."
$yes = ("y`n" * 50)
$yes | & $sdkmanager --licenses 2>&1 | Out-Host

$packages = @(
    "platforms;android-36",
    "build-tools;36.0.0",
    "ndk;27.1.12297006",
    "cmake;3.22.1"
)

Write-Host "Instalando pacotes SDK..."
& $sdkmanager @packages 2>&1 | Out-Host

Write-Host "Concluído. ANDROID_HOME=$sdkRoot"
