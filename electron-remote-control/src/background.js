const { app } = require('electron')
const { createWindow } = require('./main/window.js')
const handleIPC = require('./main/ipc.js')

app.on('ready', () => {
    createWindow()
    handleIPC()
})

app.on('window-all-closed', () => {
    app.quit()
})