const {
    app,
    BrowserWindow,
    Tray,
    Menu
} = require('electron')
const isDev = require('electron-is-dev')

let win
let tray
const creatWindow = function () {
    win = new BrowserWindow({
        frame: false,
        show: false,
        height: 330,
        width: 330,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.once('ready-to-show', () => {
        win.hide()
    })
    console.log(isDev)
    // 判断当前程序是否开发程序
    if (isDev) {
        win.loadURL('http://localhost:8081/')
    }

    // 托盘菜单
    tray = new Tray(`${__dirname}/puppet.ico`)
    const items = [{
            label: '设置',
            click: () => {

            }
        }, {
            label: '关于',
            click: () => {

            }
        },
        {
            type: 'separator'
        },
        {
            label: '退出',
            icon: `${__dirname}/exit.png`,
            click: () => {
                tray = null
                app.quit()
            }
        }
    ]
    const contextMenu = Menu.buildFromTemplate(items)
    tray.setToolTip('傀儡端')
    tray.setContextMenu(contextMenu)

    tray.on("double-click", () => {
        win.show()
    })
    // 托盘
    return win
}

// IPC通信
function send(event, data) {
    win.webContents.send(event, data)
}

module.exports = {
    creatWindow,
    send
}