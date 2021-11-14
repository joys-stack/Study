const { app, BrowserWindow, Tray, Menu } = require('electron')
const isDev = require('electron-is-dev')

let win
let tray
const creatWindow = function () {
    win = new BrowserWindow({
        frame: false,
        show: false,
        height: 680,
        width: 680,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.once('ready-to-show', () => {
        win.show()
    })

    // 判断当前程序是否开发程序
    if (isDev) {
        win.loadURL('http://localhost:8080/')
    }

    // 托盘菜单
    tray = new Tray(`${__dirname}/puppet.ico`)
    const items = [
        {
            label: '设置', 
            click: () => {

            }
        },
        { type: 'separator' },
        {
            label: '退出',
            icon: `${__dirname}/exit.png`,
            click: () => {
                app.quit()
            }
        }
    ]
    const contextMenu = Menu.buildFromTemplate(items)
    tray.setToolTip('傀儡端')
    tray.setContextMenu(contextMenu)
    // 托盘
    return win
}

module.exports = { creatWindow }