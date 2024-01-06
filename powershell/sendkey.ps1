param([string]$window, [string]$key)

. $PSScriptRoot\helpers\Wait-ForWindow.ps1

$wshell = New-Object -ComObject wscript.shell;
Write-Output "Activating window: $($window)"
$wshell.AppActivate($window)
# Sleep 1
Wait-ForWindow -ProcessName $window -WindowTitle $window

Write-Output "Sending key: $($key)"
$wshell.SendKeys($key)
