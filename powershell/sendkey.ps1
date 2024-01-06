param($window, $key)

$wshell = New-Object -ComObject wscript.shell;
$wshell.AppActivate($window)
Sleep 1
$wshell.SendKeys($key)
