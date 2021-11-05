const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

let mainWindow
const createWindow = function () {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    if (isDev) {
        mainWindow.loadURL('http://localhost:8080/')
    } else {
        mainWindow.loadFile('index.html')
    }
}

function send(channel, ...args){
    mainWindow.webContents.send(channel, ...args)
}
module.exports = { createWindow, send }