import req from '../lib/req.js'

// 函数命名规范 请求方式 get/post/delete/put + 路由名称 小驼峰的命名方式
// 例：get  priv/appAll 函数的名称为 getAppAll

/** ********************************************系统共用********************************************/
/**
 * 【系统共用】用户登录
 * @param {Object} param 参数
 * @Author Joy
 * @Description 登录
 * @CreateDate 2021-11-24
 * @ModifyAuthor
 * @ModifyDate
 * @ModifyDescription
 */
export function postLogin(param) {
  return new Promise((resolve, reject) => {
    const url = 'public/login'
    req.post(url, param).then(reponse => {
      resolve(reponse)
    }).catch(error => {
      reject(error)
    })
  })
}
