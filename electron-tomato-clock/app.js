const {
    app,
    BrowserWindow
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
}

app.on('window-all-closed', () => {
    app.quit()
})