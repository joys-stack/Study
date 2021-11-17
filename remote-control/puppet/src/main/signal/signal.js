const WebSocket = require('ws')
const EventEmitter = require('events')
const ws = new WebSocket('ws://localhost:8010/puppet')
const signal = new EventEmitter()

// 连接
ws.onopen = () => {
    console.log('连接成功')
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

// 发送消息
function send(event, data) {
    ws.send(JSON.stringify({ event, data }))
}

signal.send = send
module.exports = signal