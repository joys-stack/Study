// 解析vue文件的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 显示打包进度的插件
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
// 清空打包数据
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

// 配置module 与 plugin
module.exports = {
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                compilerOption: {
                    preserveWhitespace: false
                }
            }
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ProgressBarWebpackPlugin(),
        new CleanWebpackPlugin()
    ]
}