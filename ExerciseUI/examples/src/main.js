import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

import ExUI from '../../lib/exercise.js'
import '../../lib/theme/index.css'
import '../src/assets/reset.css'

console.log(ExUI)
// import hljs from 'vue-highlightjs'
// import 'highlight.js/styles/idea.css'  //这里有多个样式，自己可以根据需要切换
import hljs from './directive/highlight'
Vue.use(hljs);
Vue.use(ExUI)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')