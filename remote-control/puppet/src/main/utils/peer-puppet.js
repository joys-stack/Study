const {
    desktopCapturer,
    ipcRenderer
} = window.require('electron')

const EventEmitter = require('events')
const peer = new EventEmitter()

ipcRenderer.on('IPCOffer', async (e, offer) => {
    console.log(123)
    // 获取桌面流
    async function getScreenScream() {
        const sources = await desktopCapturer.getSources({
            types: ['screen']
        })
        return new Promise((resolve, reject) => {
            navigator.webkitGetUserMedia({
                auido: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: sources[0].id,
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
        await pc.setRemoteDescription(offer)
        await pc.setLocalDescription(await pc.createAnswer())
        return pc.localDescription
    }

    createAnswer(offer).then(answer => {
        if (answer) {
            ipcRenderer.send('IPCForward', {
                event: 'answer',
                data: {
                    type: answer.type,
                    sdp: answer.sdp
                }
            })
        }
    })

    pc.onicecandidate = (e) => {
        if (e.candidate) {
            // 告知其他人
            /* const data = {
                address: e.candidate.address,
                candidate: e.candidate.candidate,
                component: e.candidate.component,
                foundation: e.candidate.foundation,
                port: e.candidate.port,
                priority: e.candidate.priority,
                protocol: e.candidate.protocol,
                relatedAddress: e.candidate.address,
                relatedPort: e.candidate.relatedPort,
                sdpMLineIndex: e.candidate.sdpMLineIndex,
                sdpMid: e.candidate.sdpMid,
                tcpType: e.candidate.tcpType,
                type: e.candidate.type,
                usernameFragment: e.candidate.usernameFragment
            } */
            const data = e.candidate.toJSON()
            ipcRenderer.send('IPCPuppetCandidate', 'puppet-candidate', data)
        }
    }

    async function addIceCandidate(candidate) {
        if (!candidate) return
        await pc.addIceCandidate(new RTCIceCandidate(candidate))
    }

    ipcRenderer.on('IPCCandidate', (e, candidate) => {
        addIceCandidate(candidate)
    })
})

module.exports = peer