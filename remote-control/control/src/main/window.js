const {
    BrowserWindow
} = require('electron')
const isDev = require('electron-is-dev')

let win
const createWindow = function (option, url) {
    win = new BrowserWindow({
        ...option,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // 渲染进程加载完毕，显示窗口
    win.once('ready-to-show', () => {
        win.show()
    })

    if (isDev) {
        win.loadURL(url)
    } else {
        win.loadFile('index.html')
    }
    return win
}

function send(channel, ...args) {
    win.webContents.send(channel, ...args)
}
module.exports = {
    createWindow,
    send
}