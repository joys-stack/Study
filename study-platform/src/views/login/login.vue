<template>
  <div class="common-login">
    <div class="login-background-img">
      <!-- <img
        id="login-bgImg"
        src="../../assets/images/bg.jpg"
      > -->
    </div>
    <div class="login">
      <h2>学习笔记管理平台</h2>
      <a-tabs default-active-key="01">
        <a-tab-pane
          key="01"
          tab="用户登录"
        >
          <a-form-model
            ref="loginAccountRef"
            :model="loginAccountModel"
            :rules="loginAccountRules"
            class="login-form"
          >
            <a-form-model-item
              has-feedback
              prop="UserCode"
            >
              <a-input
                v-model.trim="loginAccountModel.UserCode"
                placeholder="用户名"
                autocomplete="off"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                />
              </a-input>
            </a-form-model-item>
            <a-form-model-item
              has-feedback
              prop="UserPassword"
            >
              <a-input-password
                v-model.trim="loginAccountModel.UserPassword"
                placeholder="密码"
                @keyup.enter="onLogin"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                />
              </a-input-password>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
      </a-tabs>
      <a-button
        type="primary"
        @click="login"
      >
        登录
      </a-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// 导入公用函数
import { EncryptMD5, throttle } from '@/lib/common'

export default {
  data() {
    return {
      loginAccountModel: {
        UserCode: null,
        UserPassword: null
      },
      loginAccountRules: {
        UserCode: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        UserPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions(['SignIn']),

    // 登录节流处理
    login: throttle(function () {
      this.onLogin()
    }, 2000),
    // 登录
    onLogin() {
      this.$refs.loginAccountRef.validate(valid => {
        if (!valid) return false
        const param = {
          userCode: this.loginAccountModel.UserCode,
          userPassword: EncryptMD5(this.loginAccountModel.UserPassword)
        }
        this.onSignIn(param)
      })
    },
    onSignIn(params) {
      const { SignIn } = this
      // 登录
      SignIn(params).then(res => {
        this.$router.push({ path: '/home' }, onComplete => { }, onAbort => { })
      }).catch((err) => {
        const message = err.message || err
        this.$message.error(message)
      })
    }
  }
}
</script>

<style lang="css" scoped>
.login-background-img {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  -webkit-animation: fadeIn 0.8s ease-in-out 0s 1;
  -moz-animation: fadeIn 0.8s ease-in-out 0s 1;
  -o-animation: fadeIn 0.8s ease-in-out 0s 1;
  -ms-animation: fadeIn 0.8s ease-in-out 0s 1;
  animation: fadeIn 0.8s ease-in-out 0s 1;
  animation-fill-mode: both;
}

#login-bgImg {
  height: 100%;
  position: absolute;
  z-index: -1;
}

.common-login {
  height: 100%;
}

.login {
  /* margin: -250px auto 0; */
  position: absolute;
  top: 20%;
  right: 200px;
  width: 100%;
  max-width: 420px;
  padding: 20px;
  box-sizing: border-box;
  padding: 25px 30px;
  background-color: #fff;
  box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.19);
  box-sizing: border-box;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
}

.login .validate-code {
  width: 150px;
  border-radius: 0;
}

.validate-code:hover {
  cursor: pointer;
}

.login-form >>> .ant-input {
  height: 46px !important;
  padding-left: 40px;
}

.login-form >>> .ant-input-prefix {
  font-size: 20px;
}

.login-form >>> .ant-form-item-control {
  width: 100%;
}

.login-form >>> .ant-form-item-control-wrapper {
  width: 100%;
  margin-left: 0;
}

.login > .ant-btn {
  width: 100%;
  height: 40px;
  font-size: 20px;
  margin-bottom: 40px;
}

.login {
  animation-name: login-animated;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}

.login >>> .ant-tabs-nav-container {
  text-align: center;
}

.login .send-button {
  font-size: 14px;
  color: #ccc;
}

.login .send-button:hover {
  color: rgb(24, 144, 255);
}

.login h2 {
  font-size: 26px;
  text-align: center;
  margin-bottom: 30px;
}

@keyframes login-animated {
  0% {
    opacity: 0.3;
    -ms-transform: scale(0.5);
    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    -o-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    -ms-transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}
</style>
