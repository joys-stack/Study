const {
    ipcMain,
    BrowserWindow
} = require('electron')

// 信令服务
const signal = require('../signal/signal')
// 窗口对象
const {
    send: puppetSend
} = require('../window/puppet')

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

    ipcMain.on('IPCForward', data => {
        console.log('IPCForward: ' + data)
        signal.send('forward', data)
    })

    // 监听 offer
    signal.on('offer', offer => {
        console.log('offer: ' + offer)
        puppetSend('IPCOffer', offer)
    })
}

module.exports = {
    handleIPC
}