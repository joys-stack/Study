const {
    app,
    BrowserWindow,
    Notification,
    ipcMain
} = require('electron')

// 窗口准备时间
app.on('ready', createWindow)

let mainWindow = null
// 创建窗口
function createWindow() {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.on('close', () => {
        mainWindow = null
    })

    mainWindow.webContents.openDevTools()
    handleIPC()
}

app.on('window-all-closed', () => {
    app.quit()
})

function handleIPC() {
    ipcMain.handle('IPCNotication', async () => {
        let res = new Promise((resolve, reject) => {
            let notification = new Notification({
                title: '任务结束',
                body: '是否开始休息',
                actions: [
                    {
                        text: '开始休息',
                        type: 'button'
                    }
                ],
                closeButtonText: '继续工作'
            })
            // 打开弹窗
            notification.show()
            // 响应action
            notification.on('action', () => {
                resolve('rest')
            })

            notification.on('close', () => {
                resolve('work')
            })
        })
        return res
    })
}