const {
    ipcMain,
    BrowserWindow
} = require('electron')
const {
    createWindow
} = require('./window')

module.exports = function () {
    // 登录通信
    ipcMain.handle('IPCLogin', async () => {
        // 先mock，返回一个Code
        let code = Math.floor(Math.random() * (999999 - 100000)) + 100000
        return code
    })

    // Toolbar通信
    ipcMain.on('IPCToolbar', (e, v) => {
        // 获取当前操作的窗口
        const win = BrowserWindow.getFocusedWindow()
        if (win) {
            if (v === 'Min') {
                win.minimize()
            } else if (v === 'Close') {
                win.webContents.send('control-state-change', '', '')
                win.close()
            } else if (v === 'Max') {
                if (win.isMaximized()) {
                    win.unmaximize()
                } else {
                    win.maximize()
                }
            }
        }
    })

    ipcMain.on('IPCRemoteControl', async (e, remoteCode) => {
        // 这里跟服务端交互，现在 mock返回
        /* sendMainWindow('control-state-change', remoteCode, '1') */
        // 获取当前操作的窗口
        const win = BrowserWindow.getFocusedWindow()
        win.webContents.send('control-state-change', remoteCode, '1')
        let w = createWindow({
            height: 680,
            width: 1000,
            transparent: true
        }, 'http://localhost:8080/control')
        w.webContents.openDevTools()
    })
}