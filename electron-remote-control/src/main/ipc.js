const { ipcMain } = require('electron')
const { send: sendMainWindow } = require('./window')
const { create: createControlWindow } = require('./control')

module.exports = function () {
    ipcMain.handle('IPCLogin', async () => {
        // 先mock，返回一个Code
        let code = Math.floor(Math.random() * (999999 - 100000)) + 100000
        return code
    })

    ipcMain.on('control', async (e, remoteCode) => {
        // 这里跟服务端交互，现在 mock返回
        sendMainWindow('control-state-change', remoteCode, '1')
        createControlWindow()
    })
}