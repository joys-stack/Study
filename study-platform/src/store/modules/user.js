import { postLogin, postLogout } from '@/api/public'

// 用户登录/登出模块
const user = {
  state: {
    token: null
  },
  mutations: {
    SETTOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    // 登录
    SignIn({
      commit
    }, param) {
      return new Promise((resolve, reject) => {
        postLogin(param).then(res => {
          const message = res.error
          if (res && res.code === 200) {
            const obj = res.data || {}

            // 将对象转成字符串
            const objStr = JSON.stringify(obj)
            window.SessionStorage.setItem('AccessToken', objStr)
            commit('SETTOKEN', obj)
            resolve(obj)
          } else {
            reject(new Error(message))
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    SignOut({
      commit
    }, param) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        // 调用登出接口
        const result = await postLogout(param.url, param['param'])
        if (result && result.code === 1) {
          // 清除本地内存中的内容
          window.SessionStorage.clear()
          // 清除登录token
          commit('SETTOKEN', null)
          resolve('')
        }
      })
    }
  }
}

export default user
