/******创建less入口文件***** */
const fs = require('fs')
const path = require('path')
const conpoments = require(path.resolve(process.cwd(), './conpoments.json'))
const basePath = path.resolve(process.cwd(), './conpoments')

const lessList = ["@import url('./base.less');"]

Object.keys(conpoments).forEach(key => {
    // 特殊的文件不进行处理
    if (['icon'].includes(key)) return
    // 文件名称
    const fileName = `${key}.less`
    const p = path.resolve(basePath, 'theme', 'src', fileName)
    // 判断当前文件是否存在
    if (!fs.statSync(p).isFile()) {
        // 如果文件不存在，则创建该文件，并写入空值
        fs.writeFileSync(p, '', 'utf8')
    }
    lessList.push(`@import url('./${fileName}');`)
})

// 需要写入的数据
const str = lessList.join('\r\n')
// 写入数据的路径
const _path = path.resolve(basePath, 'theme', 'src', 'index.less')
fs.writeFileSync(_path, str, 'utf8')

console.log('[build:theme]------>done')