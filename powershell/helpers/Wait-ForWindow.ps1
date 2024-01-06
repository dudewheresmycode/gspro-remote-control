$MAX_ATTEMPTS = 30
$WAIT_PERIOD = 1

function Wait-ForWindow {
    param (
        $ProcessName,
        $WindowTitle,
        $Attempt
    )

    Write-Output "Looking for window $($WindowTitle) in process $($ProcessName)"
    $proc = Get-Process -Name $ProcessName

    $NextAttempt = 1
    if ($Attempt) {
        $NextAttempt = $Attempt + 1
    }
    if ($proc.Id) {
        Write-Output "Found process $($proc.Id)"
        if ($proc.MainWindowTitle -eq $WindowTitle) {
            Write-Output "Found window $($WindowTitle)"
        } else {
            if ($NextAttempt -lt $MAX_ATTEMPTS) {
                Write-Output "Could not find window on attempt $($NextAttempt)"
                Start-Sleep -Seconds $WAIT_PERIOD
                Wait-ForWindow -ProcessName $ProcessName -WindowTitle $WindowTitle -Attempt $NextAttempt
            } else {
                Write-Host "Giving up"
            }
        }
    } else {
        if ($NextAttempt -lt $MAX_ATTEMPTS) {
            Write-Output "Could not find process on attempt $($NextAttempt)"
            Start-Sleep -Seconds $WAIT_PERIOD
            Wait-ForWindow -ProcessName $ProcessName -WindowTitle $WindowTitle -Attempt $NextAttempt
        } else {
            Write-Host "Giving up"
        }
    }
}
