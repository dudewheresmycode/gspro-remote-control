param([string]$window, [string]$key)

$wshell = New-Object -ComObject wscript.shell
Write-Output "Activating window: $($window)"
$wshell.AppActivate($window)

Write-Output "Sending key: $($key)"
$wshell.SendKeys($key)
