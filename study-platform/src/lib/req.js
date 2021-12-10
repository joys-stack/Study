import axios from 'axios'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false
})

console.log(process.env)
console.log(process.env.VUE_APP_API_BASE_URL)
const VueAxios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000,
  // 不开启凭证
  withCredentials: false
})

// 请求失败处理器
const errorHandler = e => {

}

// 请求拦截器
VueAxios.interceptors.request.use(config => {
  NProgress.start()
  // 加入请求认证
  /* const date = new Date().toGMTString()
  config.headers.Authorization = createAuthorization(config, date, Config.AccessKey, Config.AccessKeySecret)
  config.headers['x-bis3-date'] = date
  config.headers['x-bis3-version'] = '1.0' */
  return config
}, errorHandler)

// 相响应拦截器
VueAxios.interceptors.response.use(response => {
  NProgress.done()
  return response
}, errorHandler)

export default VueAxios
