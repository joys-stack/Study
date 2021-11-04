const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

let mainWindow
const create = function () {
    mainWindow = new BrowserWindow({
        height: 1000,
        width: 680,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    if (isDev) {
        mainWindow.loadURL('http://localhost:8080/control')
    }
}

module.exports = { create }