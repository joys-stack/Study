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

module.exports = { peer }