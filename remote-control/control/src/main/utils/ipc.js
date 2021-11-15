const { ipcMain, BrowserWindow } = require('electron')

const { send: sendControl } = require('../window/control')
const { createWindow } = require('../window/control-view')
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
            console.log('登陆成功')
        }else {
            console.log('登陆失败')
        }
        createWindow()
    })

    signal.on('connection-success', data => {
        sendControl('connection-success', data)
    })
}

module.exports = {
    handleIPC
}