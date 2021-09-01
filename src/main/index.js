var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var win = null;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
app.on('ready', () => {
    win = new BrowserWindow({
        //transparent: true,
        // frame: false,
        webPreferences: { 
            nodeIntegration: true, 
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    // win.loadFile('index.html');
    // win.webContents.openDevTools();
    let path = require('path');
    let URL = require('url');
    let url = '';
    if (process.env.NODE_ENV !== 'production') {
        url = 'http://localhost:' + process.env.ELECTRON_WEBPACK_WDS_PORT;
    } else {
        url = URL.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file'
        });
    }
    win.loadURL(url);
    win.on('closed', () => {
        win = null;
    });
})

app.on('window-all-closed', () => {
    app.quit();
});