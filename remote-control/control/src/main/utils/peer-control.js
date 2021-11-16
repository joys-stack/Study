const EventEmitter = require('events')
const peer = new EventEmitter()
const { ipcRenderer } = window.require('electron')
const signal = require('../signal/signal')

// WebRTC 通讯
const pc = new window.RTCPeerConnection({})

// 控制端创建 offer
async function createOffer() {
    const offer = pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true
    })
    await pc.setLocalDescription(offer)
    return pc.localDescription
}

// 将创建好的offer提交给傀儡端
createOffer().then(offer => {
    signal.send('forward', {
        event: 'offer',
        data: {
            type: offer.type,
            sdp: offer.sdp
        }
    })
})

// 监听返回的 answer
ipcRenderer.on('IPCAnswer', answer => {
    pc.setRemoteDescription(answer)
})

// 视频流
pc.onaddstream = e => {
    peer.emit('add-stream', e.stream)
}

module.exports = {
    peer
}