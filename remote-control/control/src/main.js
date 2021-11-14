import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'
import './assets/css/index.css'

// 获取配置文件中的内容
function getConfig(){
}
getConfig()
const app = createApp(App)
app.use(router).mount('#app')
