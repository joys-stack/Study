const {
    desktopCapturer,
    ipcRenderer
} = window.require('electron')

const EventEmitter = require('events')
const peer = new EventEmitter()

ipcRenderer.on('IPCOffer', async offer => {
    // 获取桌面流
    async function getScreenScream() {
        const sources = await desktopCapturer.getSources({
            types: ['screen']
        })
        return new Promise((resolve, reject) => {
            navigator.mediaDevices.webkitGetUserMedia({
                auido: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        choremMediaSourceId: sources[0].id,
                        maxWidth: window.screen.width,
                        maxHeight: window.screen.height
                    }
                }
            }, stream => {
                resolve(stream)
            }, error => {
                reject(error)
            })
        })
    }

    // WebRTC
    const pc = new window.RTCPeerConnection({})

    async function createAnswer(offer) {
        const stream = await getScreenScream()
        pc.addStream(stream)
        pc.setRemoteDescription(offer)
        pc.setLocalDescription(await pc.createAnswer())
        return pc.localDescription
    }

    createAnswer(offer).then(answer => {
        ipcRenderer.send('IPCForward', {
            event: 'answer',
            data: {
                type: answer.type,
                sdp: answer.sdp
            }
        })
    })
})

module.exports = peer