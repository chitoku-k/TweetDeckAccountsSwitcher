function Invoke-AppVeyorInstall
{
    if ($env:BROWSER -eq 'firefox')
    {
        Invoke-FirefoxInstall
    }

    Invoke-NodeInstall
}

function Invoke-FirefoxInstall
{
    $firefox = 'https://download.mozilla.org/?product=firefox-devedition-stub&os=win&lang=ja'
    Start-FileDownload $firefox -FileName 'Installer.exe'
    .\Installer.exe | Out-Null
}

function Invoke-NodeInstall
{
    Install-Product node 9 x64
}
