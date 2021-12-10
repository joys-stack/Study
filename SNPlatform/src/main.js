import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入公用部分
import '@/assets/index.js'

Vue.config.productionTip = false
Vue.prototype.Emitter = new Vue()
window.Vue = Vue.prototype
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
