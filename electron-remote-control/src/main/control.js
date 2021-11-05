const {
    BrowserWindow
} = require('electron')
const isDev = require('electron-is-dev')

let mainWindow
const create = function () {
    mainWindow = new BrowserWindow({
        height: 680,
        width: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    if (isDev) {
        mainWindow.loadURL('http://localhost:8080/control')
    }

    mainWindow.on('close', (e) => {
        console.log(BrowserWindow.getAllWindows())
        console.log(BrowserWindow.getFocusedWindow())
        e.preventDefault();
        BrowserWindow.getFocusedWindow().close()
        // mainWindow.hide()
    })
}

module.exports = {
    create
}