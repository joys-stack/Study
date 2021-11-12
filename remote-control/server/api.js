const {
    readFile,
    writeFile
} = require('./file')

// 获取数据
async function getData() {
    return new Promise((resolve, reject) => {
        const result = await readFile()
        resolve(result)
    })
}

// 写入数据
function postData(data) {
    writeFile(data)
}

module.exports = {
    getData,
    postData
}