const WebSocket = require('ws')
const EventEmitter = require('events')
const ws = new WebSocket('ws://localhost:8010/control')
const signal = new EventEmitter()

// 连接
ws.onopen = () => {
    // console.log('连接成功')
}

// 监听消息
ws.onmessage = (e => {
    let data = {}
    try {
        data = JSON.parse(e.data)
    } catch (error) {
        console.log(error)
    }
    signal.emit(data.event, data.data)
})

ws.onclose = () => {
    console.log('close')
}

// 发送消息
function send(event, data) {
    ws.send(JSON.stringify({ event, data }))
}

// 登录处理
function invoke(event, data, answerEvent) {
    return new Promise((resolve, reject) => {
        send(event, data)
        signal.once(answerEvent, resolve)
        setTimeout(() => {
            reject('Time out')
        }, 5000)
    })
}

signal.send = send
signal.invoke = invoke
module.exports = signal