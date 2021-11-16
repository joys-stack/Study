const {
    ipcMain,
    BrowserWindow
} = require('electron')

const {
    send: sendControl
} = require('../window/control')
const {
    createWindow,
    send: sendControlView
} = require('../window/control-view')
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
            } else if (v === 'Hide') {
                win.hide()
            }
        }
    })

    ipcMain.on('IPCRemoteControl', async (e, data) => {
        // 登录验证
        const result = await signal.invoke('control-login', data, 'login')
        if (result.isSuccess) {
            createWindow()
            console.log('登陆成功')
        } else {
            console.log('登陆失败')
        }
    })

    signal.on('connection-success', data => {
        sendControl('connection-success', data)
    })

    signal.on('answer', data => {
        console.log('answer：' + data)
        sendControlView('answer', data)
    })
}

module.exports = {
    handleIPC
}