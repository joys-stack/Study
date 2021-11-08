const { ipcMain } = require('electron')
const robot = require('robot')
const vkey = require('vkey')

function handleMouse(data) {
    // data {clientX, clientY, screen:{ width,height}, video:{width, height} }
    let x = data.clientX * data.screen.width / data.video.width
    let y = data.clientY * data.screen.height / data.video.height
    robot.moveMouse(x, y)
    robot.mouseClick()
}

function handleKey(data) {
    // data { keyCode, meta, alt, ctrl, shfit}
    const modifiers = []
    if (data.meta) modifiers.push('meta')
    if (data.shfit) modifiers.push('shfit')
    if (data.alt) modifiers.push('alt')
    if (data.ctrl) modifiers.push('ctrl')
    let key = vkey[data.keyCode].toLowerCase()
    robot.keyTap(key, modifiers)
}

module.export = function () {
    ipcMain.on('robot', (e, type, data) => {
        if (type === 'mouse') {
            handleMouse(data)
        } else if (type === 'key') {
            handleKey(data)
        }
    })
}