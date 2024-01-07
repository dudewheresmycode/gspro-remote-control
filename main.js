// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('node:path');

const express = require('express');
const { ip } = require('address');

const runPowershell = require('./powershell')

const HTTP_PORT = 3130;
const GSPRO_WINDOW_TITLE = 'GSPro';
const server = express();
const ipAddress = ip();

server.get('/keyboard', async (req, res) => {
  const { key } = req.query;
  if (!key) {
    return res.status(400).send('Missing key code!');
  }
  try {
    console.log(`Sending key "${key}" to GSPro`);
    await runPowershell('sendkey', GSPRO_WINDOW_TITLE, key);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }


});

server.listen(HTTP_PORT, () => console.log(`API server running at http://${ipAddress}:${HTTP_PORT}/`));


function getIcon() {
  if (process.platform === 'win32') return 'iconTemplate.ico';
  // if (systemPreferences.isDarkMode()) return 'iconTemplate.png';
  return 'iconTemplate.png';
};


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  if (app.dock) {
    app.dock.show();
  }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function createTray() {
  const tray = new Tray(`icons/${getIcon()}`);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `GSProRemote is running`,
      type: 'normal',
      enabled: false
    },
    {
      label: `${ipAddress}:${HTTP_PORT}`,
      type: 'normal',
      enabled: false
    },
    {
      type: 'separator'
    },
    {
      label: 'Settings',
      type: 'normal',
      click: () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
      }
    },
    {
      label: 'Quit',
      type: 'normal',
      click: () => {
        app.quit();
      }
    }
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // createWindow();

  createTray();

  if (app.dock) {
    app.dock.hide();
  }

  // app.on('activate', function () {
  //   // On macOS it's common to re-create a window in the app when the
  //   // dock icon is clicked and there are no other windows open.
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow()
  // })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  // if (process.platform === 'darwin') {
  if (app.dock) {
    app.dock.hide();
  }
  // }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.