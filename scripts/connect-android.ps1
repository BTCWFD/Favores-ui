# Script para conectar Android a Favores-UI
# Uso: .\scripts\connect-android.ps1

Write-Host "--- Configuracion de Conexion Android ---" -ForegroundColor Cyan

# Obtener IPs locales
$ips = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike '*Loopback*' } | Select-Object -ExpandProperty IPAddress

Write-Host "`nPara probar en tu dispositivo Android localmente:" -ForegroundColor Yellow
foreach ($ip in $ips) {
    Write-Host "1. Abre el navegador en tu Android y entra a: http://$($ip):3000" -ForegroundColor White
}

Write-Host "`n--- Opcion ADB (Cable USB) ---" -ForegroundColor Cyan
if (Get-Command adb -ErrorAction SilentlyContinue) {
    Write-Host "ADB detectado. Ejecutando redireccion de puerto 3000..." -ForegroundColor Green
    adb reverse tcp:3000 tcp:3000
    Write-Host "Ahora puedes entrar a http://localhost:3000 desde tu Android con cable USB." -ForegroundColor White
} else {
    Write-Host "ADB no detectado en el sistema." -ForegroundColor Red
    Write-Host "Si quieres usar cable USB, instala Android Platform Tools y añade 'adb' al PATH." -ForegroundColor Gray
}

Write-Host "`nRecuerda iniciar el servidor con: npm run dev" -ForegroundColor Cyan
