const EventEmitter = require('events')
const peer = new EventEmitter()
const {
    ipcRenderer
} = window.require('electron')

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

// 监听返回的 answer
ipcRenderer.on('IPCAnswer', (e, answer) => {
    console.log(answer)
    pc.setRemoteDescription(answer)
})

// 视频流
pc.onaddstream = e => {
    console.log(e)
    peer.emit('add-stream', e.stream)
}

peer.create = function () {
    // 将创建好的offer提交给傀儡端
    createOffer().then(offer => {
        ipcRenderer.send('IPCForward', {
            event: 'offer',
            data: {
                type: offer.type,
                sdp: offer.sdp
            }
        })
    })
}

pc.onicecandidate = e => {
    if (e.candidate) {
        const data = {
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
        }
        console.log(data)
        ipcRenderer.send('IPCControlCandidate', 'control-candidate', data)
    }
}

ipcRenderer.on('IPCCandidate', (e, candidate) => {
    addIceCandidate(candidate)
})

let candidates = []
async function addIceCandidate(candidate) {
    if (!candidate || !candidate.type) return
    candidates.push(candidate)
    if (pc.remoteDescription && pc.remoteDescription.type) {
        for (let i = 0; i < candidates.length; i++) {
            await pc.addIceCandidate(new RTCIceCandidate(candidates[i]))
        }
        candidates = []
    }
}

module.exports = {
    peer
}