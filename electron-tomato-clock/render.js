const {
    ipcRenderer
} = require('electron')
const Timer = require('timer.js')
const {
    readFile
} = require('./utils/file')
const path = require('path')

// 获取按钮
const btn = document.querySelector('.btn')
const boxContainer = document.querySelector('.box-container')
const operate = document.querySelector('.header-operate')

btn.onclick = function () {
    startWork('work')
}

operate.onclick = function (e) {
    const spanObj = e.target
    // 获取属性
    const attribute = spanObj.getAttribute('value')
    ipcRenderer.send('IPCOperate', attribute)
}

// 开始工作函数
async function startWork(type) {
    // 读取配置文件
    const configResult = JSON.parse(await readFile(path.resolve(__dirname, 'config.json')))
    const s = (type === 'work' ? parseInt(configResult.WorkTime) : parseInt(configResult.FreeTime)) * 60
    let workerTimer = new Timer({
        ontick: (e) => {
            updateTime(e)
        },
        // 时间结束，弹窗提示
        onend: () => {
            updateTime(0)
            notification()
        }
    })
    // 专注时间
    workerTimer.start(s)
}

// 页面显示的时间
function updateTime(ms) {
    const s = (ms / 1000).toFixed(0)
    const ss = (s % 60).toString()
    const mm = Math.floor(s / 60).toFixed(0)
    boxContainer.innerHTML = `${mm.padStart(2, '0')}:${ss.padStart(2, '0')}`
}

// 问题一：ipcRenderer中的 invoke 与 send 的区别
// 问题二：Notification的运用
// 问题三：timer.js的应用
async function notification() {
    let res = await ipcRenderer.invoke('IPCNotication')
    if (res === 'rest') {
        startWork('rest')
    } else if (res === 'work') {
        startWork('work')
    }
}