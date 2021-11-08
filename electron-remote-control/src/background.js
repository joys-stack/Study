const {
    app
} = require('electron')
const {
    createWindow
} = require('./main/window.js')
const handleIPC = require('./main/ipc.js')

app.on('ready', () => {
    // 创建窗口
    createWindow({
        height: 400,
        width: 400,
        resizable: false
    }, 'http://localhost:8080/')

    // 处理IPC通信
    handleIPC()
})

app.on('window-all-closed', () => {
    app.quit()
})