const WebSocket = require('ws')

// 创建服务对象并监听端口 8010
const wss = new WebSocket.Server({
    port: 8010
})

// 监听连接
wss.on('connection', (ws, request) => {

})