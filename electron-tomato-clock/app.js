const {
    app,
    BrowserWindow,
    Notification,
    ipcMain,
    Menu,
    Tray
} = require('electron')

// 窗口准备
app.on('ready', createWindow)

let mainWindow = null
let tray = null
// 创建窗口
function createWindow() {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400,
        show: false,
        frame: false,
        icon: './static/fav.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.on('close', () => {
        tray = null
        mainWindow = null
    })

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    // mainWindow.webContents.openDevTools()
    handleIPC()

    // 系统托盘
    tray = new Tray('./static/fav.ico')
    const menu = Menu.buildFromTemplate([{
        label: '设置',
        click: () => {

        }
    }, {
        label: '帮助'
    }, {
        type: 'separator',
    }, {
        icon: './static/exit.ico',
        role: 'quit',
        label: '退出'
    }])
    tray.setToolTip('微信')
    tray.setContextMenu(menu)

    tray.on('click', () => {
        mainWindow.show()
    })
}

app.on('window-all-closed', () => {
    app.quit()
})

function handleIPC() {
    // 监听Notication
    ipcMain.handle('IPCNotication', async () => {
        let res = new Promise((resolve, reject) => {
            let notification = new Notification({
                title: '任务结束',
                body: '是否开始休息',
                actions: [{
                    text: '开始休息',
                    type: 'button'
                }],
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

    // 监听操作
    ipcMain.on('IPCOperate', (e, v) => {
        if (v === 'Min') {
            mainWindow.minimize()
        } else if (v === 'Max') {
            if (mainWindow.isMaximized) {
                mainWindow.unmaximize()
            } else {
                mainWindow.maximize()
            }
        } else if (v === 'Close') {
            mainWindow.hide()
        }
    })
}