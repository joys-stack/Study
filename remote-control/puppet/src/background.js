const {
    app
} = require('electron')
const {
    creatWindow
} = require('./main/window/puppet')
const {
    handleIPC
} = require('./main/utils/ipc')

// 声明周期
app.on('ready', function () {
    try {
        // 创建窗口
        creatWindow()
        // 执行IPC
        handleIPC()
        // 连接WebSocket
        require('./main/signal/signal')
    } catch (error) {
        console.log(error)
    }
})

app.on('window-all-closed', () => {
    if (process.platform === 'drawin') {
        app.exit()
    }
})