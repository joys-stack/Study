const path = require('path')
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge.merge(require('./webpack.base.conf'), {
    mode: 'development',
    entry: {
        index: ['./src/index.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../lib'),
        libraryTarget: 'umd'
    }
})