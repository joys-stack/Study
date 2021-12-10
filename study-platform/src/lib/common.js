// 导入加密相关的函数
import HmacSha1 from 'crypto-js/hmac-sha1'
import Base64 from 'crypto-js/enc-base64'
import crypto from 'crypto-js'
import bus from './bus'
import VUE_CONST from '../constants/constants'

/**
 * @param {Object} config ：配置文件对象
 * @param {Date} date ：当前时间（GMT）
 * @param {String} accessKey ：访问键
 * @param {String} accessKeySecret ：访问键密码
 */
export function createAuthorization(config, date, accessKey, accessKeySecret) {
  let auth = ''
  auth += config.method.toUpperCase() + '\n'
  auth += date + '\n'
  auth += 'x-bis3-date:' + date + '\n'
  auth += 'x-bis3-version:1.0\n'

  // url : http://127.0.0.1:8888/api/Donor/Donation
  // params : { DonationCode : 9000620118731}
  const url = config.baseURL + config.url
  let Route = url.substring(url.indexOf('/api/') + 5)

  // 路由生成
  if (config.params && config.method.toUpperCase() !== 'POST') {
    Route += '?'
    for (const key in config.params) {
      Route += key + '=' + config.params[key]
      Route += '&'
    }
    Route = Route.substring(0, Route.length - 1)
  }
  auth += Route
  const signature = Base64.stringify(HmacSha1(auth, accessKeySecret))
  const Authorization = 'BIS3 ' + accessKey + ':' + signature
  return Authorization
}

/**
 * MD5 加密
 * @param {String} val：需加密的字符串
 */
export function EncryptMD5(val) {
  return crypto.MD5(val).toString().toUpperCase()
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param collection
 * @param children
 * @param property
 * @param value
 * @returns {*}
 */
export function onRecursive(collection, children, property, value) {
  let result = null
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index]
    if (element[property] === value) {
      result = element
      break
    }
    if (Object.prototype.toString.call(element[children]) === '[object Array]' && element[children].length > 0) {
      const find = onRecursive(element[children], children, property, value)
      if (find) {
        return find
      }
    }
  }
  return result
}

/**
 * 时间格式化
 * @param {String} fmt 需要转换的时间格式
 */
export function dateFormat(fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if (!fmt || fmt === '') {
    fmt = 'yyyy-MM-dd' // 默认的时间格式
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

/**
 * 获取本月的第一天
 */
export function getFirstDayOfMonth() {
  this.setDate(1)
  return this
}

/**
 * 获取上一个月
 */
export function getLastMonth() {
  this.setMonth(this.getMonth() - 1)
  return this
}

/**
 * 获取颜色
 */
export function getColor(key, value) {
  let colorObj = {}
  if (key === '') return colorObj
  switch (key.toUpperCase()) {
    case 'ABO':
      if (value === '1') {
        colorObj = {
          color: '#008000',
          fontWeight: '550'
        }
      } else if (value === '2') {
        colorObj = {
          color: '#00F',
          fontWeight: '550'
        }
      } else if (value === '3') {
        colorObj = {
          color: '#F00',
          fontWeight: '550'
        }
      } else if (value === '4') {
        colorObj = {
          color: '#000',
          fontWeight: '550'
        }
      }
      break
    case 'RHD':
      if (value === '1') {
        colorObj = {
          color: '#008000',
          fontWeight: '550'
        }
      } else if (value === '2') {
        colorObj = {
          color: '#000',
          fontWeight: '550'
        }
      }
  }
  return colorObj
}

/**
 * 生成指定位数的UUID
 * @param {INT} len UUID指定的位数
 * @param {INT} radix 进制
 * @param {String} uType UUID类型 0:纯数字  1：纯字母  2：数字+字母混合
 * @author DZY
 */
export function getUUID(len, radix, uType) {
  let chars = ''
  switch (uType) {
    case '0':
      chars = '0123456789'
      break
    case '1':
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      break
    case '2':
    default:
      chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      break
  }

  const uuid = []
  let i = 0
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    var r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

/**
 * 文件下载
 * @param  {Blob} 文件流
 * @param  {String} filename 想要保存的文件名称
 * @Author DZY
 * @Description 下载
 * @CreateDate 2020-12-28
 * @ModifyAuthor
 * @ModifyDate
 * @ModifyDescription
 */
export function download(blob, filename) {
  // ie的下载
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
      var downloadElement = document.createElement('a')
      var href = window.URL.createObjectURL(blob) // 创建下载的链接
      downloadElement.href = href
      downloadElement.download = filename // 下载后文件名
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    }
  }
}

/**
 * 时间差计算
 * @param  {String} startTime-开始时间
 * @param  {String} endTime-结束时间
 * @diffType  {String} diffType-时间差类型 second：秒  minute：分   hour：小时   day：天
 * @Author DZY
 * @Description
 * @CreateDate 2020-12-28
 * @ModifyAuthor
 * @ModifyDate
 * @ModifyDescription
 */
export function getDateDiff(startTime, endTime, diffType) {
  // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  startTime = startTime.replace(/-/g, '/')
  endTime = endTime.replace(/-/g, '/')
  // 将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase()
  var sTime = new Date(startTime) // 开始时间
  var eTime = new Date(endTime) // 结束时间
  // 作为除数的数字
  var divNum = 1
  switch (diffType) {
    case 'second':
      divNum = 1000
      break
    case 'minute':
      divNum = 1000 * 60
      break
    case 'hour':
      divNum = 1000 * 3600
      break
    case 'day':
      divNum = 1000 * 3600 * 24
      break
    default:
      break
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum))
}

/** 方法摘自：https://www.jianshu.com/p/8de2cecc10eb */
// 用户长时间未操作 退出登录
let timer = null
clearInterval(timer)
export function isOperateFun(delay) {
  // 最后一次点击时间
  let lastTime = new Date().getTime()
  // 当前时间
  let currentTime = new Date().getTime()
  // 允许最长未操作时间
  const timeOut = delay

  // 重新赋值最后一次点击时间，清除定时器，重新开始定时器
  function handleReset() {
    lastTime = new Date().getTime()
    if (timer) {
      closeTimer(timer)
    }

    // 获取当前的锁屏状态
    const lockFlag = sessionStorage.getItem('lock-screen')
    if (!timer && lockFlag !== 'true') {
      handleInterval()
    }
  }

  document.onclick = () => { // 单击事件
    handleReset()
  }

  document.ondblclick = () => { // 双击事件
    handleReset()
  }

  document.onmousedown = () => { // 按下鼠标键时触发
    handleReset()
  }

  document.onmouseup = () => { // 释放按下的鼠标键时触发
    handleReset()
  }

  document.onmousemove = () => { // 鼠标移动事件
    handleReset()
  }

  document.onmouseover = () => { // 移入事件
    handleReset()
  }

  document.onmouseout = () => { // 移出事件
    handleReset()
  }

  document.onmouseenter = () => { // 移入事件
    handleReset()
  }

  document.onmouseleave = () => { // 移出事件
    handleReset()
  }

  function handleInterval() { // 定时器
    timer = setInterval(() => {
      currentTime = new Date().getTime() // 当前时间
      if (currentTime - lastTime > timeOut) {
        closeTimer(timer) // 清除定时器
        sessionStorage.setItem('lock-screen', 'true')
        bus.$emit('lock', true)
      }
    }, 1000)
  }
  handleInterval() // 一开始程序 默认执行定制器
}

/**
 * 手动锁屏时，清除计时器
 */
export function closeTimer() {
  clearInterval(timer)
  timer = null
}

export function destroyOperateFun() {
  document.onclick = null
  document.ondblclick = null
  document.onmousedown = null
  document.onmouseup = null
  document.onmousemove = null
  document.onmouseover = null
  document.onmouseout = null
  document.onmouseenter = null
  document.onmouseleave = null
  closeTimer(timer)
}

/**
 * 函数节流处理
 * @param {Function} fn 要执行的处理函数
 * @param {Number} interval 执行的间隔时间
 * @Author DZY
 * @Description 函数节流
 * @CreateDate 2021-03-12
 * @ModifyAuthor
 * @ModifyDate
 * @ModifyDescription
 */
export function throttle(fn, interval) {
  // 最后一次触发的时间
  let lastTime
  // 计时器
  let timer
  // 时间间隔
  const timeInterval = interval || 500
  return function () {
    // 执行当前函数的对象
    const that = this
    // 当前函数的参数
    const args = arguments
    // 获取当前时间
    const nowTime = new Date()
    // 如果最后一次触发的时间不为空，并且当前时间与最后一次触发的时间 之差小于时间间隔，则使处理函数 在 时间间隔之后进行执行，否则立即执行
    if (lastTime && (nowTime - lastTime < timeInterval)) {
      // 先将计时器关掉
      clearTimeout(timer)
      // 然后在 时间间隔之后 执行处理函数
      timer = setTimeout(function () {
        lastTime = nowTime
        fn.apply(that, args)
      }, timeInterval)
    } else {
      lastTime = nowTime
      fn.apply(that, args)
    }
  }
}

/**
 * 函数防抖处理
 * @param {Function} fn 要执行的处理函数
 * @param {Number} interval 执行的间隔时间
 * @Author DZY
 * @Description 函数防抖
 * @CreateDate 2021-03-12
 * @ModifyAuthor
 * @ModifyDate
 * @ModifyDescription
 */
export function debounce(fn, delay) {
  const _delay = delay || 500
  let timer
  return function (a) {
    const th = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(th, args)
    }, _delay)
  }
}

/**
 * 获取浏览器比例
 * @returns
 */
export function detectZoom() {
  let ratio = 0
  const screen = window.screen
  const ua = navigator.userAgent.toLowerCase()

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth
  }

  if (ratio) {
    ratio = Math.round(ratio * 100)
  }

  return ratio
}

/**
 * 根据值获取键
 * @param {*} obj
 * @param {*} value
 * @param {*} compare
 */
export function findKey(obj, value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value))
}

/**
 * 根据值获取键(解析Excel时用)
 * @param {*} obj
 * @param {*} value
 * @param {*} compare
 */
export function findKey2(obj, value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k].v, value))
}

/**
 * 获取系统参数
 * @param {*} ParamType
 */
export function GetSysParam(ParamType) {
  return VUE_CONST[ParamType]
}

/**
 * 时间数字转时间
 * @param {*} numb
 */
export function dateNumnerToDate(numb) {
  const time = new Date((numb - 1) * 24 * 3600000 - 1)
  time.setYear(time.getFullYear() - 70)
  time.setDate(time.getDate() - 1)
  return time
}
