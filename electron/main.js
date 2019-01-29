const { app, Menu, BrowserWindow } = require('electron');
const server = require('../server');
const config = require('../electron/config');

(async () => {
  let mainWindow;
  const { home } = await server();
  app.on('ready', function createWindow () {
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({ width: 1200, height: 900 });
    mainWindow.loadURL(config.home || home);
    if (config.openDevTools) {
      // Open the DevTools.
      mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', function () {
      mainWindow = null
    })
  });

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });
})();