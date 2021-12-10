import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import req from './lib/req'

import '@/mock/mock'
// 定义全局混入
import './mixins/mixin'

// 导入an-design 组件库
import '../src/plugins/ant-design.js'

import 'nprogress/nprogress.css'

// 加入帮助函数
import '../src/lib/utils'
// 静态公共样式
import '../src/assets/css/reset.css'
import '../src/assets/css/common.css'
import '../src/assets/css/font.css'

// 动态主题样式
import './themes/index.less'

// 导入过滤器
import '../src/filters/filter.js'

// 导入自定义指令
import '../src/directives/directives.js'

// 导入封装后的sessionStorage
import {
  sessionStorage
} from '../src/lib/session-storage'

// 读取配置文件
async function getConfig() {
  const result = await req.get('./config.json')
  Vue.prototype.$config = result
  window.config = result
  // 将分装的 SessionStorage 挂在到 window 对象中
  window.SessionStorage = sessionStorage
}

Vue.config.productionTip = false

async function createApp() {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}

// 立即执行函数，初始化 vue示例 ，初始化配置文件
(async function () {
  await getConfig()
  await createApp()
})()
