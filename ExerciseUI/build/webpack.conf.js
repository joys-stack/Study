// 基础打包配置文件路径
const WebpackBaseConf = require('./webpcak.base.conf.js')
// webpack配置文件合并
const WebpackMerge = require('webpack-merge')
// 导入文件路径操作
const path = require('path')

module.exports = WebpackMerge.merge(WebpackBaseConf, {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    devtool: 'source-map',
    entry: {
        exercise: './src/index.js'
    },
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: process.env.NODE_ENV === 'development' ? '[name].js' : '[name].min.js',
        libraryTarget: 'umd',
        library: 'exercise'
    }
})