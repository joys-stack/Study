const fs = require('fs')

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {
            encoding: 'utf-8'
        }, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    }).catch(error => {
        reject(error)
    })
}

module.exports = {
    readFile
}