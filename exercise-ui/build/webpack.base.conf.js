// 清理打包
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                preserveWhitepace: true,
                extractCss: isDev ? false : true,
                cssModules: {
                    localIndetName: '[xxx]',
                    camcelcase: true
                },
                hoeReload: true
            },
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        }, {
            test: /\.(ttf|eot|svg|woff)$/,
            type: 'asset',
            // 生成打包文件的位置
            generator: {
                filename: 'img/[name].[hash:6][ext]'
            },
            // 相当于 limit的设置
            parser: {
                dataUrlCondition: {
                    maxSize: 25 * 1024
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}