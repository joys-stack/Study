const signal = require('./signal/signal')
const robot = require('robotjs')
const vkey = require('vkey')

function handleMouse(data) {
    // data {clientX, clientY, screen:{ width,height}, video:{width, height} }
    let x = data.clientX * data.screen.width / data.video.width
    let y = data.clientY * data.screen.height / data.video.height
    robot.moveMouse(x, y)
    robot.mouseClick(data.button)
}

function handleKey(data) {
    // data { keyCode, meta, alt, ctrl, shfit}
    const modifiers = []
    if (data.meta) modifiers.push('meta')
    if (data.shfit) modifiers.push('shfit')
    if (data.alt) modifiers.push('alt')
    if (data.ctrl) modifiers.push('ctrl')
    let key = vkey[data.keyCode].toLowerCase()
    console.log(data)
    console.log(modifiers)
    console.log(key)
    if (!key.startsWith('<')) {
        robot.keyTap(key, modifiers)
    }
}

module.exports = function () {
    signal.on('robot', (e, type, data) => {
        if (type === 'mouse') {
            handleMouse(data)
        } else if (type === 'key') {
            handleKey(data)
        }
    })
}