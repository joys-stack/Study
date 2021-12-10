import CryptoJS from 'crypto-js'

class SessionStorage {
  constructor() {
    this.autoEncrypt = true
  }

  // 保存
  setItem(key, value) {
    let v = value
    if (this.autoEncrypt) {
      v = this.AesEncrypt(v)
    }
    sessionStorage.setItem(key, v)
  }

  // 获取
  getItem(key) {
    const v = sessionStorage.getItem(key)
    if (v) {
      if (this.autoEncrypt) {
        return this.AesDecode(v)
      } else {
        return v
      }
    } else {
      return ''
    }
  }

  // 移除
  removeItem(key) {
    sessionStorage.removeItem(key)
  }

  // 清空
  clear() {
    sessionStorage.clear()
  }

  // AES 加密
  AesEncrypt(v) {
    return CryptoJS.AES.encrypt(v, CryptoJS.enc.Utf8.parse(window.config.AesKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
  }

  // AES 加密 解密
  AesDecode(v) {
    return CryptoJS.AES.decrypt(v, CryptoJS.enc.Utf8.parse(window.config.AesKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
  }
}

const sessionStorageCustom = new SessionStorage()
export {
  sessionStorageCustom as sessionStorage
}
