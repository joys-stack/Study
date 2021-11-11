const WebSocket = require('ws')
const wss = new WebSocket().Server({ port: 8010 })

const code2ws = new Map()
wss.on('connection', function (ws, request) {
    let code = Math.floor(Math.random() * 999999 - 100000) + 100000
    code2ws.set(code, ws)

    ws.sendData = (event, data) => {
        ws.send(JSON.stringify({ event, data }))
    }
    ws.on('message', function incoming(message) {
        let msg = {}
        try {
            msg = JSON.parse(message)
        } catch (error) {
            ws.sendError('message invalid')
            return
        }
        let { event, data } = msg
        if (event === 'login') {
            ws.sendData('logined', { code })
        } else if (event === 'control') {
            let remote = +data.remote
            if (code2ws.has(remote)) {
                ws.sendData('controlled', { remote })
                ws.sendRemote = code2ws.get(remote).senData
                ws.sendRemote('be-controlled', { remote: code })
            }
        }else if(event === 'forward'){
            ws.sendRemote(data.event, data.data)
        }
    })

    ws.on('close', ()=>{
        code2ws.delete(code)
        clearTimeout(ws._closeTimeout)
    })

    ws._closeTimeout = setTimeout(()=>{
        ws.terminate()
    }, 10 * 60 * 1000)
})