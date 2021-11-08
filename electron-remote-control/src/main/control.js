const {
    BrowserWindow
} = require('electron')
const isDev = require('electron-is-dev')

let mainWindow
const create = function () {
    mainWindow = new BrowserWindow({
        height: 680,
        width: 1000,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    if (isDev) {
        mainWindow.loadURL('http://localhost:8080/control')
    }
}

module.exports = {
    create
}