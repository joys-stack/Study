const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {
    DefinePlugin
} = require('webpack')

module.exports = {
    entry: path.resolve(process.cwd(), 'examples', 'src', 'main.js'),
    mode: 'development',
    output: {
        path: path.resolve(process.cwd(), 'examples', 'dist'),
        filename: '[name].[hash:4].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.css/,
            use: ['style-loader', 'css-loader']
        }/* , {
            test: /\.md$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            }, {
                loader: path.resolve(__dirname, './md-loader/index.js')
            }]
        } */]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Exercise UI',
            template: './examples/public/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './examples/public',
                to: './examples/dist',
                globOptions: {
                    // 忽略指定的文件(这里小坑，必须写 **/)
                    ignore: ['**/index.html']
                }
            }]
        }),
        new DefinePlugin({
            BASE_URL: "'./examples/dist'"
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        compress: true,
        port: 9000
    }
}