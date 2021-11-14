
const crypto = require('crypto')

function getMD5(content){
    return crypto.createHash('md5').update(content).digest().toString().toUpperCase()
}

module.exports = {
    getMD5
}