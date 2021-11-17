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

    ipcMain.on('IPCForward', (e, v) => {
        signal.send('forward', v)
    })

    ipcMain.on('IPCPuppetCandidate', (e, event, data) => {
        signal.send('forward', {
            event,
            data
        })
    })

    // 监听 offer
    signal.on('offer', offer => {
        puppetSend('IPCOffer', offer)
    })

    signal.on('control-candidate', v => {
        puppetSend('IPCCandidate', v)
    })
}

module.exports = {
    handleIPC
}