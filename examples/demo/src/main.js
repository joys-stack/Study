import Vue from 'vue'
import App from './App.vue'
import ExUI from '../../../exercise-ui/lib/index'
/* const ExUI= require('../../../exercise-ui/lib/index') */
/* import ExUI from '../../../exercise-ui/src/index' */

console.log(ExUI)
Vue.use(ExUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
