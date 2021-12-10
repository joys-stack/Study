// 文件压缩对象
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 指定需要压缩的文件
const productionGzipExtensions = ['js', 'css', 'less']
// 引入主题提取对象
const themePlugin = require('./src/config/theme-plugin')

// 根据当前的时间生成程序打包的版本号
const date = new Date()
const year = (date.getFullYear()).toString()
const month = (date.getMonth() + 1).toString().padStart(2, '0')
const day = (date.getDate()).toString().padStart(2, '0')
const hour = (date.getHours()).toString().padStart(2, '0')
const minutes = (date.getMinutes()).toString().padStart(2, '0')
const version = year + month + day + hour + minutes

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static/' + version,
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    plugins: [
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      }),
      themePlugin()
    ]
  },
  css: {
    extract: true,
    requireModuleExtension: true,
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        lessOptions: {
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    }
  }
}
