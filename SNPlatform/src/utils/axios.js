import axios from 'axios'
import Vue from 'vue'
import {
  message
} from 'ant-design-vue'

const request = axios.create({
  baseURL: '/api/',
  timeout: 6000
})

// 响应、请求错误处理器
const ErrorHandler = error => {
  message.error(error.message)
}

// 请求拦截器
request.interceptors.request.use(config => {
  // 加入 Author 认证
  return config
}, ErrorHandler)

// 响应拦截器
request.interceptors.response.use(res => {
  return res.data
}, ErrorHandler)

// post请求
const _post = (url, data) => {
  return new Promise((resolve, reject) => {
    request.post(url, data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// get请求
const _get = (url, data) => {
  return new Promise((resolve, reject) => {
    request.get(url, {
      params: data
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// delete请求
const _delete = (url, data) => {
  return new Promise((resolve, reject) => {
    request.delete(url, {
      params: data
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// put请求
const _put = (url, data) => {
  return new Promise((resolve, reject) => {
    request.put(url, {
      params: data
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// download 请求
const _download = (url, data, callback) => {
  return new Promise((resolve, reject) => {
    request.get(url, {
      params: data,
      onDownloadProgress: e => {
        if (callback) {
          callback(e)
        }
      }
    })
  })
}

// upload 请求
const _upload = (url, data, callback) => {
  return new Promise((resolve, reject) => {
    request.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: e => {
        if (callback) {
          callback(e)
        }
      }
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// 挂在到Vue原型中
Vue.prototype.post = _post
Vue.prototype.get = _get
Vue.prototype.delete = _delete
Vue.prototype.put = _put
Vue.prototype.download = _download
Vue.prototype.upload = _upload

export default request
