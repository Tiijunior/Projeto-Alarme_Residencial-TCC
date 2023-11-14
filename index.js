const {app, BrowserWindow} = require('electron');
const path = require('path');
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,            
        }
    });
    
      //mainWindow.loadURL(`file://${path.join(__dirname, '/telas/home.html')}`);
      mainWindow.loadURL(`file://${path.join(__dirname, '/telas/editar_perfil.html')}`);
      //mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`);


    //mainWindow.setFullScreen(true)
    //mainWindow.setMenu(null)
    
});