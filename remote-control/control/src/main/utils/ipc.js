const { ipcMain, BrowserWindow } = require('electron')

const { send: sendControl } = require('../window/control')
const signal = require('../signal/signal')

function handleIPC() {
    // Toolbar通信
    ipcMain.on('IPCToolbar', (e, v) => {
        // 获取当前操作的窗口
        const win = BrowserWindow.getFocusedWindow()
        if (win) {
            if (v === 'Min') {
                win.minimize()
            } else if (v === 'Close') {
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

    ipcMain.on('IPCRemoteControl', async (e, data) => {
        // 登录验证
        const result = await signal.invoke('control-login', data, 'login')
        if (result.isSuccess) {

        }
        // 这里跟服务端交互，现在 mock返回
        /* sendMainWindow('control-state-change', remoteCode, '1') */
        // 获取当前操作的窗口
        /* const win = BrowserWindow.getFocusedWindow()
        win.webContents.send('control-state-change', remoteCode, '1')
        let w = createWindow({
            height: 680,
            width: 1000,
            transparent: true
        }, 'http://localhost:8080/control') */
    })

    signal.on('connection-success', data => {
        sendControl('connection-success', data)
    })
}

module.exports = {
    handleIPC
}