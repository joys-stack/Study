const WebSocket = require('ws')
const {
    getData
} = require('./api')
const {
    getMD5
} = require('./until')

// 创建服务端，监听端口 8888 
const wss = new WebSocket.Server({
    port: 8010
})

// 控制端与傀儡段控制关系
let controlRelMap = new Map()

// 监听连接
wss.on('connection', async (ws, request) => {
    // 发送消息
    ws.sendData = (event, data) => {
        ws.send(JSON.stringify({
            event,
            data
        }))
    }

    // 发送错误信息
    ws.sendError = (data) => {
        ws.send(JSON.stringify({
            error: 'error',
            data
        }))
    }

    const remoteAddress = request.socket.remoteAddress
    const IP = remoteAddress.replace(/^:[\s\S]*:/g, '')
    let key

    // 判断是控制端连接还是傀儡端连接
    if (request.url === '/control') {
        key = getMD5(`${IP}/control`)
        console.log(`control：${IP}`)
    } else if (request.url === '/puppet') {
        key = getMD5(`${IP}/puppet`)
        console.log(`puppet：${IP}`)
    }
    controlRelMap.set(key, ws)

    // 监听消息
    ws.on('message', msg => {
        let message = {}
        try {
            message = JSON.parse(msg.toString())

            let {
                event,
                data
            } = message
            // 控制端请求消息
            // // 登陆
            if (event === 'control-login') {
                const ControlCode = getMD5(`http://${data.ClientIP}`)
                // const isLogined = d.findIndex(item => item.ClientIP === data.ClientIP && item.ClientPort === data.ClientPort && item.ClientUser === data.ClientUser && item.ClientPassword === data.ClientPassword) >= 0
                if (controlRelMap.has(ControlCode)) {
                    ws.sendData('login', {
                        isSuccesss: true
                    })
                    ws.sendRemote = controlRelMap.get(ControlCode).ws.sendData
                } else {
                    ws.sendData('login', {
                        isSuccesss: false
                    })
                }
            }

            // 傀儡端请求消息
            if (event === 'puppet-setting') {
                // 写入设置的用户名、密码、端口

            }

            // 控制端与傀儡端的信息转发
            if (event === 'control-to-puppet') {
                ws.sendRemote(data.event, data.data)
            }
        } catch (error) {
            ws.sendError('message invalid')
            return
        }
    })
})