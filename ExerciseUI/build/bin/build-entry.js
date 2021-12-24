// 导入文件操作
const path = require('path')
// 导入组件配置
const conpoments = require(path.resolve(process.cwd(), 'conpoments.json'))
// 导入字符串模板操作
const render = require('json-templater/string')
// 字符串驼峰转换
const uppercamelcase = require('uppercamelcase')
// 换行符
const newline = require('os').EOL
// 版本
const VERSION = require('../../package.json').version
// 写入数据操作
const fs = require('fs')

// 导入模板
const importTemplate = `import {{NAME}} from '{{PATH}}'`
// 主要内容模板字符串
const mainTemplate = `//自动化创建通过 build/bin/build-entry.js
{{IMPORTS}}

const conpoments = [{{CONPOMENTS}}]

const install = Vue => {
    conpoments.forEach(conpoment => {
        Vue.component(conpoment.name, conpoment)
    })
}

export default {
    version:'{{VERSION}}',
    install,
    {{CONPOMENTS}}
}
`
const importList = []
const conpomentList = []
Object.keys(conpoments).forEach(key => {
    const importStr = render(importTemplate, {
        NAME: `Ex${uppercamelcase(key)}`,
        PATH: conpoments[key]
    })
    importList.push(importStr)
    conpomentList.push('Ex' + uppercamelcase(key))
})

const IMPORTS = importList.join(`;${newline}`)
const CONPOMENTS = conpomentList.join(`,${newline}    `)

const mainStr = render(mainTemplate, {
    IMPORTS,
    CONPOMENTS,
    VERSION
})

// 写入数据
fs.writeFileSync(path.resolve(__dirname, '../../src/index.js'), mainStr)

console.log('[build:file]------>done')
