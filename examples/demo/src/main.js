import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ExUI from '../../../ExerciseUI/lib/exercise'
import ExButton from '../../../ExerciseUI/lib/exercise'
import '../../../ExerciseUI/lib/theme/index.css'
import './assets/reset.css'

console.log(ExUI)
console.log(ExButton)
Vue.use(ExUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
