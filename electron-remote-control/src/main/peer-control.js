const EventEmitter = require('events')
const peer = new EventEmitter()
const { ipcRenderer, desktopCapturer } = window.require('electron')

// 获取桌面流
async function getScreenStream() {
    const sources = await desktopCapturer.getSources({ types: ['screen'] })

    navigator.webkitGetUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[0].id,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
            }
        }
    }, stream => {
        peer.emit('add-stream', stream)
    }, error => {
        console.log(error)
    })
}

getScreenStream()
peer.on('robot', (type, data) => {
    if (type === 'mouse') {
        data.screen = {
            width: window.screen.width,
            height: window.screen.height
        }
    }
    ipcRenderer.send('robot', type, data)
})

const pc = new window.RTCPeerConnection({})
pc.onicecandidate = function (e) {
    console.log(e.candidate)
}

let candidates = []
async function addIceCandidate(candidate) {
    if (candidate) {
        candidates.push(candidate)
    }
    if (pc.remoteDescription && pc.remoteDescription.type) {
        for (let i = 0; i < candidates.length; i++) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate))
        }
        candidates = []
    }
}
window.addIceCandidate = addIceCandidate

async function createOffer() {
    const offer = pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true
    })
    await pc.setLocalDescription(offer)
    return pc.localDescription
}


createOffer()

async function setRomote(answer) {
    await pc.setRemoteDescription(answer)
}

window.setRomote = setRomote
pc.onaddstream = function (e) {
    peer.emit('add-stream', e.stream)
}
module.exports = { peer }