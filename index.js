const {app, BrowserWindow, screen, webFrame} = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        //resizable: false,
        //fullscreen: true,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,            
        }
    });
    
    //mainWindow.setMenu(null)
    
    //mainWindow.loadURL(`file://${path.join(__dirname, '/telas/home.html')}`);
    //mainWindow.loadURL(`file://${path.join(__dirname, '/telas/primeiro_passos/cadastro_zona.html')}`);
    mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`);

    
});