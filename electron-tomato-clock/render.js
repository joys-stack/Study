const { ipcRenderer } = require('electron')
const Timer = require('timer.js')

// 获取按钮
const btn = document.querySelector('.btn')
const boxContainer = document.querySelector('.box-container')

btn.onclick = function () {
    startWork()
}

// 开始工作函数
function startWork() {
    let workerTimer = new Timer({
        ontick: (e) => {
            updateTime(e)
        },
        // 时间结束，弹窗提示
        onend: () => {
            notification()
        }
    })
    // 专注时间，默认50s ，后续通过设置进行配置
    workerTimer.start(5)
}

// 页面显示的时间
function updateTime(ms) {
    const s = (ms / 1000).toFixed(0)
    const ss = (s % 60).toString()
    const mm = (s / 60).toFixed(0)
    boxContainer.innerHTML = `${mm.padStart(2, '0')}:${ss.padStart(2, '0')}`
}

// 问题一：ipcRenderer中的 invoke 与 send 的区别
// 问题二：Notification的运用
// 问题三：timer.js的应用
async function notification() {
    let res = await ipcRenderer.invoke('IPCNotication')
    if (res === 'rest') {
        // 休息
    } else if (res === 'work') {
        startWork()
    }
}

// startWork()
