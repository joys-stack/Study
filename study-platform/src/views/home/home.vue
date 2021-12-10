<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    :class="mixin_theme['THEME_MENU'] || 'theme-dark'"
    v-title:data-title="appName"
  >
    <a-layout-sider
      v-model="collapsed"
      class="sidebar"
      width="250"
    >
      <div class="logo">
        <img
          src="../../assets/images/logo.png"
          alt="血液中心"
        ><span v-if="!collapsed">{{ appName }}</span>
      </div>
      <!--侧边栏部分（菜单-功能点）-->
      <a-sidebar @openClick="openClick"></a-sidebar>
    </a-layout-sider>
    <a-layout class="layout-main">
      <a-layout-header class="layout-header">
        <!--头部部分-->
        <a-header></a-header>
        <!--标签导航部分-->
        <a-tabs></a-tabs>
      </a-layout-header>
      <!--主体页面部分-->
      <a-layout-content class="layout-content">
        <transition
          name="layout-content-animated"
          mode="out-in"
        >
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </a-layout-content>
    </a-layout>

    <!--提示弹窗-->
    <div :class="['warn-form',isShowWarn?'show-warn-form':'']">
      <a-icon
        type="exclamation-circle"
        style="color:red;margin:0 10px;font-size:16px;"
      />
      <span>最多打开10个功能点</span>
    </div>

    <!-- 锁屏 -->
    <lock
      v-if="isShow"
      :isLock="isShow"
    ></lock>
  </a-layout>
</template>

<script>
import bus from '@/lib/bus.js'
// 导入基础组件
import sidebar from '../home/sidebar.vue'
import header from '../home/header.vue'
import tabs from '../home/tabs.vue'
import lock from '../other/lock'

// 导入公用函数
import { isOperateFun, destroyOperateFun } from '@/lib/common'

export default {
  components: {
    'a-sidebar': sidebar,
    'a-header': header,
    'a-tabs': tabs,
    lock
  },
  data() {
    return {
      collapsed: false,
      tagsList: [],
      isShowWarn: false,
      timer: null,
      isShow: false,
      visible: false
    }
  },
  created() {
    bus.$on('collapsed', val => {
      this.collapsed = val
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      const arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })

    // 锁屏
    // 监听锁屏事件
    bus.$on('lock', lock => {
      this.isShow = lock
    })
    // 调用 系统是否进行操作的判断方法
    isOperateFun(this.$config.LockDelay)

    const session = window.SessionStorage.getItem('AccessToken')
    if (session !== '' && session) {
      const obj = JSON.parse(session)
      if (obj.appName) {
        this.appName = obj.appName
      } else {
        this.appName = this.getAppName(obj.appID)
      }
    }
  },
  mounted() {
    // 读取本地sessionStroage ，获取锁屏状态
    const lock = sessionStorage.getItem('lock-screen')
    this.isShow = lock === 'true'
  },
  beforeDestroy() {
    clearInterval(this.timer)
    destroyOperateFun()
  },
  methods: {
    onClick(val) {
      this.theme = val
    },
    openClick(val) {
      const that = this
      this.isShowWarn = true
      this.timer = setTimeout(() => {
        that.isShowWarn = false
      }, 1000)
    },
    // 获取应用程序名称
    getAppName(appID) {
      let appName = ''
      switch (appID) {
        case 71:
          appName = '绩效管理平台'
          break
        case 79:
          appName = '数据共享平台'
          break
      }

      return appName
    }
  }
}
</script>

<style lang="css" scoped>
.sidebar {
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
}

.layout-main {
  overflow-y: overlay;
}

#components-layout-demo-custom-trigger {
  height: 100%;
  position: relative;
  overflow: hidden;
}

#components-layout-demo-custom-trigger .logo {
  margin-left: 16px;
  line-height: 50px;
  box-shadow: 1px 2px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  vertical-align: top;
  white-space: nowrap;
  display: inline-block;
  -webkit-transition: width 0.3s;
  -moz-transition: width 0.3s;
  transition: width 0.3s;
  overflow: hidden;
}

.logo img {
  vertical-align: middle;
}

.logo span {
  display: inline-block;
  height: 50px;
  font-size: 18px;
  color: #fff;
  line-height: 50px;
  vertical-align: middle;
  padding-left: 8px;
  font-weight: 700;
  word-spacing: 5px;
  overflow: hidden;
}

.layout-main {
  height: 100%;
}

.layout-header {
  background-color: #fff;
  height: 88px;
  padding: 0;
  line-height: 50px;
  position: sticky;
  top: 0;
  z-index: 99;
}

.layout-content {
  margin: 6px 10px 10px;
  padding: 2px;
  background: rgb(245, 247, 249);
  min-height: 280px;
  min-width: 1366px;
  height: 100%;
  position: relative;
  z-index: 2;
}

.layout-content-animated-enter,
.layout-content-animated-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.layout-content-animated-enter-active,
.layout-content-animated-leave-active {
  transition: all 0.3s ease;
}

.warn-form {
  display: none;
  height: 60px;
  width: 190px;
  line-height: 60px;
  background-color: #fff;
  position: absolute;
  top: 40%;
  left: 52%;
  z-index: 999;
  font-size: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  animation: shake 0.3s;
  -o-animation: shake 0.3s;
  -webkit-animation: shake 0.3s;
  -moz-animation: shake 0.3s;
}

.show-warn-form {
  display: block;
}

@keyframes shake {
  0%,
  100% {
    -webkit-transform: translateX(0);
  }

  8%,
  40%,
  72% {
    -webkit-transform: translateX(5px);
  }

  16%,
  48%,
  80% {
    -webkit-transform: translateY(5px);
  }

  24%,
  56%,
  88% {
    -webkit-transform: translateX(-5px);
  }

  32%,
  64%,
  96% {
    -webkit-transform: translateY(-5px);
  }
}

.ring {
  position: absolute;
  top: 100px;
  right: -80px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  z-index: 999;
  text-align: center;
}

.ring-phone {
  font-size: 30px;
  color: #fff;
  text-align: center;
  line-height: 58px;
}

div[class^="ball"] {
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: 0 0 20px rgba(0, 0, 255, 0.7);
  border-radius: 50%;
  top: -5px;
  left: -5px;
  width: 60px;
  height: 60px;
  opacity: 0;
}

.ring-animate {
  animation: moveAnimate 1s ease alternate forwards;
}

.ring-animate2 {
  animation: moveAnimate2 1s ease alternate forwards;
}

.ball-animate1 {
  animation: ringAnimate 2s ease 1s infinite normal;
}

.ball-animate2 {
  animation: ringAnimate 2s ease 1.5s infinite normal;
}

.ball-animate3 {
  animation: ringAnimate 2s ease 2s infinite normal;
}

@keyframes moveAnimate {
  0% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(-120px);
  }
}

@keyframes moveAnimate2 {
  0% {
    transform: translateX(-120px);
  }

  100% {
    transform: translateX(120px);
  }
}

@keyframes ringAnimate {
  0% {
    opacity: 1;
    top: -5px;
    left: -5px;
  }

  100% {
    top: -15px;
    left: -15px;
    opacity: 0;
    width: 80px;
    height: 80px;
  }
}
</style>
