<template>
  <div class="loading">
    <div class="spinner-wrapper">
      <span class="spinner-text">页面跳转中，请稍候...</span>
      <span class="spinner"></span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      target: ''
    }
  },
  created() {
    const authCode = this.$route.query.authCode
    const appID = this.$route.query.appID
    this.target = this.$route.query.target
    if (authCode && appID) {
      const param = {
        BSAEUrl: this.$config.PublicUrl,
        params: {
          authCode
        },
        appID: parseInt(appID),
        loginType: '1'
      }
      this.onSignIn(param)
    } else {
      this.$router.push({ path: '/login' }, onComplete => { }, onAbort => { })
    }
  },
  methods: {
    ...mapActions(['SignIn']),
    // param：单点登录参数 appID:应用ID  loginType：0:登录 1：单点登录
    onSignIn(param) {
      const { SignIn } = this
      // 登录
      SignIn(param).then(res => {
        if (this.target) {
          this.$router.push({ path: '/' + this.target }, onComplete => { }, onAbort => { })
        } else {
          this.$router.push({ path: '/home' }, onComplete => { }, onAbort => { })
        }
        this.$message.success('登录成功!')
      }).catch((err) => {
        const message = err.message || err
        this.$message.warning(message)
      })
    }
  }
}
</script>

<style lang="css" scoped>
.loading {
  height: 100%;
  background: #555;
}
.loading {
  -webkit-animation: fadein 3s;
  -moz-animation: fadein 3s;
  -o-animation: fadein 3s;
  animation: fadein 3s;
}
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-o-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.spinner-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 300;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  background: rgba(255, 255, 255, 0.8);
}
.spinner-text {
  position: absolute;
  top: 45%;
  left: 50%;
  margin-left: -100px;
  margin-top: 2px;
  color: #000;
  letter-spacing: 1px;
  font-size: 26px;
  font-family: Arial;
}
.spinner {
  position: absolute;
  top: 45%;
  left: 50%;
  display: block;
  margin-left: -160px;
  width: 1px;
  height: 1px;
  border: 20px solid rgba(255, 0, 0, 1);
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  border-left-color: transparent;
  border-right-color: transparent;
  -webkit-animation: spin 1.5s infinite;
  -moz-animation: spin 1.5s infinite;
  animation: spin 1.5s infinite;
}
@-webkit-keyframes spin {
  0%,
  100% {
    -webkit-transform: rotate(0deg) scale(1);
  }
  50% {
    -webkit-transform: rotate(720deg) scale(0.6);
  }
}
@-moz-keyframes spin {
  0%,
  100% {
    -moz-transform: rotate(0deg) scale(1);
  }
  50% {
    -moz-transform: rotate(720deg) scale(0.6);
  }
}
@-o-keyframes spin {
  0%,
  100% {
    -o-transform: rotate(0deg) scale(1);
  }
  50% {
    -o-transform: rotate(720deg) scale(0.6);
  }
}
@keyframes spin {
  0%,
  100% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(720deg) scale(0.6);
  }
}
</style>
