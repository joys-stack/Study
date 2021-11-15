const {
    BrowserWindow
} = require('electron')

let win
const createWindow = function () {
    win = new BrowserWindow({
        height: 768,
        width: 1366,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.on('ready-to-show', () => {
        win.show()
    })

    win.loadURL('http://localhost:8080/control')

    win.on('close', () => {
        win = null
    })

    return win
}

module.exports = {
    createWindow
}