const WebSocket = require('ws')
const { getData } = require('./api')

// 创建服务端，监听端口 8888 
const wss = new WebSocket.Server({
    port: 8010
})
// 存储已连接的用户
let weakMap = new WeakMap()
// 监听连接
wss.on('connection', async (ws, request) => {
    // 获取当前连接
    const data = await getData()
    console.log(data)
})