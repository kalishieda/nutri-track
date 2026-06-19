# Define variáveis de ambiente Android permanentemente.
# Reinicie o terminal após executar.

$javaHome = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
if (-not (Test-Path "$javaHome\bin\java.exe")) {
    Write-Error "JDK não encontrado em $javaHome. Instale: winget install Microsoft.OpenJDK.17"
    return
}

$androidHome = "$env:LOCALAPPDATA\Android\Sdk"

[Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, "User")
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidHome, "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $androidHome, "User")

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$entries = @(
    "$javaHome\bin",
    "$androidHome\platform-tools",
    "$androidHome\emulator",
    "$androidHome\cmdline-tools\latest\bin"
)

foreach ($entry in $entries) {
    if ((Test-Path $entry) -and ($userPath -notlike "*$entry*")) {
        $userPath = "$entry;$userPath"
    }
}

# Remove Java 8 antigo do PATH do usuário (evita conflito)
$userPath = ($userPath -split ';' | Where-Object {
    $_ -and
    $_ -notlike '*Java\jre1.8*' -and
    $_ -notlike '*java8path*'
}) -join ';'

[Environment]::SetEnvironmentVariable("Path", $userPath, "User")

Write-Host "Variáveis configuradas com JDK 17."
Write-Host "JAVA_HOME=$javaHome"
Write-Host "Feche e reabra o terminal."
