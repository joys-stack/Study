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

// 需要添加代码，通过 Promise返回桌面流
async function createAnswer(offer){
    let screenStream = ''
    pc.addStream(screenStream)
    pc.setRemoteDescription(offer)
    pc.setLocalDescription(await pc.createAnswer())
    return pc.localDescription
}

window.createAnswer = createAnswer