// 打包文件压缩
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 指定需要压缩的文件
// const productionGzipExtensions = ['js', 'css']
// 引入文件
const path = require('path')

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
      // 压缩配置
      /* new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      }) */
    ],
    // 分离不需要打包的代码，使用CDN
    externals: process.env.NODE_ENV === 'production' ? {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios'
    } : {}
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', path.join(__dirname, 'src'))
    // 加入less-loader
    /* config.module.rules.push({
      test: /\.less$/,
      use: ['less-loader']
    }) */
    // html中引入CDN
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap(args => {
        args[0].cdn = {
          css: [],
          js: [
            '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
            '//cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
            '//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
            '//cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js'
          ]
        }
        console.log(args)
        return args
      })
    }
  }/* ,
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
  } */
}
