const fs = require('fs')
const path = require('path')

// 读取数据
function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, 'data.json'), {
            encoding: 'UTF-8'
        }, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(data))
        })
    })
}

// 写入数据
function writeFile(data) {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(path.resolve(__dirname, 'data.json'), JSON.stringify(data))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    readFile,
    writeFile
}