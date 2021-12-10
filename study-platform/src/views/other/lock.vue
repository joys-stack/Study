<template>
  <!-- 摘自https://demo.easyweb.vip/iframe/  项目 -->
  <div class="common">
    <div class="layui-layer-move"></div>
    <div id="ew-lock-screen-group">
      <div class="lock-screen-wrapper">
        <div class="lock-screen-time">{{screenTime}}</div>
        <div class="lock-screen-date">{{screenDate}}</div>
        <div class="lock-screen-user">{{ (mixin_user && mixin_user.userName) || '未登录'}}</div>
        <div class="lock-screen-form">
          <a-input
            placeholder="请输入密码"
            class="lock-screen-psw"
            type="password"
            v-model.trim="pwd"
            @keyup.enter.native="noLock"
          />
          <a-icon
            type="unlock"
            class="arrow-right"
            @click="noLock"
          />
          <div class="lock-screen-tip"></div>
        </div>
        <div class="lock-screen-errorMessage">{{ errorMessage }}</div>
        <div class="lock-screen-tool">
          <div class="lock-screen-tool-item">
            <a-tooltip
              title="退出登录"
              placement="left"
            >
              <div @click="onLoginOut">
                <a-icon type="poweroff" />
              </div>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/lib/bus'
import { postUnlock } from '@/api/public'
// 导入公用函数
import { EncryptMD5 } from '@/lib/common'

export default {
  data() {
    return {
      screenTime: '',
      screenDate: '',
      timer: '',
      pwd: '',
      errorMessage: ''
    }
  },
  props: ['isLock'],
  mounted() {
    const that = this
    this.setTime()
    this.timer = setInterval(() => {
      if (that.isLock) {
        that.setTime()
      }
    }, 1000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    setTime() {
      const date = new Date()
      const weeks = ['日', '一', '二', '三', '四', '五', '六']
      const week = weeks[date.getDay()]
      this.screenTime = date.Format('hh:mm:ss')
      this.screenDate = date.Format('yyyy年MM月dd日') + ',星期' + week
    },
    onLoginOut() {
      window.SessionStorage.clear()
      this.$router.push({ path: '/login' }, onComplete => { }, onAbort => { })
    },
    async noLock() {
      // 请求参数
      const param = {
        instBTSID: this.mixin_user.instBTSID,
        userID: this.mixin_user.userID,
        userPassword: EncryptMD5(this.pwd)
      }

      const result = await postUnlock(this.$config.PublicUrl, param)
      if (result && result.code === 1) {
        sessionStorage.setItem('lock-screen', false)
        bus.$emit('lock', false)
        this.errorMessage = ''
      } else {
        this.errorMessage = result.error
      }
    }
  }
}
</script>

<style lang="css">
.layui-layer-move {
  display: none;
  position: fixed;
  *position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: move;
  opacity: 0;
  filter: alpha(opacity=0);
  background-color: #fff;
  z-index: 2147483647;
}

#ew-lock-screen-group {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 19891099;
}

.lock-screen-wrapper {
  color: #ffffff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 60px 0 60px;
  background-color: #000000;
  background-image: url("../../assets/images/bg-screen.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.lock-screen-time {
  font-size: 88px;
}

.lock-screen-date {
  font-size: 24px;
  padding: 0 0 0 13px;
}

.lock-screen-form {
  position: absolute;
  left: 0;
  right: 0;
  top: 65%;
  width: 100%;
  text-align: center;
}
.lock-screen-form .show-psw .lock-screen-tip {
  display: inline-block;
}

.lock-screen-tip {
  text-align: center;
  color: red;
  width: 230px;
  padding: 0 3px;
  font-size: 14px;
  text-align: left;
  box-sizing: border-box;
  /* display: none; */
}

.lock-screen-enter {
  width: 65px;
  height: 65px;
  line-height: 1;
  font-size: 28px;
  padding-top: 18px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
  transition: all 0.3s;
  cursor: pointer;
}

.lock-screen-psw {
  color: #ffffff;
  font-size: 22px;
  height: 40px;
  width: 180px;
  line-height: 40px;
  border-radius: 40px;
  box-sizing: border-box;
  vertical-align: middle;
  text-align: center;
  padding: 0 5px;
  margin-right: 10px;
  border-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
}

.lock-screen-psw .el-input__inner {
  background-color: transparent;
  border: none;
  color: #fff;
}

.lock-screen-user {
  width: 205px;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translateX(-50%);
  font-size: 30px;
  font-weight: 700;
}

.lock-screen-errorMessage {
  width: 205px;
  position: absolute;
  left: 50%;
  top: 71%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: 500;
  color: red;
}

.arrow-right {
  height: 50px;
  width: 50px;
  border: 1px solid #fff;
  line-height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
}

.lock-screen-tool {
  width: 20px;
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.lock-screen-tool .lock-screen-tool-item {
  position: relative;
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-top: 15px;
  cursor: pointer;
}
</style>
