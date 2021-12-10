<template>
  <div class="header common">
    <!-- 头部左边，包含菜单栏收缩控制、菜单栏打开展示面包屑 -->
    <ul class="nav-left">
      <li
        class="nav-item menu-collapsed"
        @click="onCollapsed"
      >
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        <div class="hidden"></div>
      </li>
      <li class="nav-breadcrumb">
        <a-breadcrumb separator="/">
          <a-breadcrumb-item
            v-for="(value,index) in breadcrumbItems"
            :key="index+''"
          >{{value}}</a-breadcrumb-item>
        </a-breadcrumb>
      </li>
    </ul>
    <!-- 头部右边，包含主题设置、下拉菜单、锁屏等 -->
    <ul class="nav-right">
      <li
        class="nav-item"
        @click="onThemeOpen"
      >
        <a-tooltip
          placement="bottom"
          title="主题"
        >
          <a-icon type="more" />
        </a-tooltip>
      </li>
      <li :class="['nav-menu']">
        <img
          src="../../assets/images/user.jpg"
          class="ant-avatar ant-avatar-circle"
        >
        <a-dropdown>
          <a
            class="ant-dropdown-link"
            @click="e => e.preventDefault()"
          >
            <span>{{ (mixin_user && mixin_user.userName) || '登录' }}</span>
            <a-icon type="caret-down" />
          </a>
          <a-menu
            slot="overlay"
            @click="handleMenuClick"
          >
            <a-menu-item key="0">
              <a-icon
                type="unlock"
                theme="filled"
              />
              <span>密码修改</span>
            </a-menu-item>
            <a-menu-item key="1">
              <a-icon
                type="question-circle"
                theme="filled"
              />
              <span>帮助文档</span>
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon
                type="info-circle"
                theme="filled"
              />
              <span>升级记录</span>
            </a-menu-item>
            <!-- <a-menu-divider />
            <a-menu-item key="9">
              <a-icon
                type="poweroff"
                style="color:red;"
              />
              <span>退出登录</span>
            </a-menu-item> -->
          </a-menu>
        </a-dropdown>
      </li>
      <li
        class="nav-item"
        @click="onLockScreen"
      >
        <a-tooltip placement="bottom">
          <span>
            <a-icon type="unlock" />
          </span>
        </a-tooltip>
      </li>
    </ul>

    <!--定制主题弹窗-->
    <base-drawer-theme
      :visible="visible"
      @close="onClose"
    ></base-drawer-theme>

    <!-- 密码修改弹窗 -->
    <base-modal-form
      title="密码重置"
      :visible="userVisible"
      @ok="handleResetOk"
      @cancel="handleResetCancel"
      :maskClosable="false"
      :width="550"
    >
      <a-form-model
        :model="formResetUser"
        :rules="formResetUserRules"
        ref="formResetUserRef"
        :label-col="{ span:4 }"
        :wrapper-col="{ span:20 }"
      >
        <a-form-model-item
          label="用户代码:"
          prop="userCode"
        >
          <a-input
            v-model="formResetUser.userCode"
            :disabled="true"
          />
        </a-form-model-item>
        <a-form-model-item
          label="用户名称:"
          prop="userName"
        >
          <a-input
            v-model="formResetUser.userName"
            :disabled="true"
          />
        </a-form-model-item>
        <a-form-model-item
          label="原密码:"
          prop="oldPwd"
        >
          <a-input-password
            v-model.trim="formResetUser.oldPwd"
            autocomplete="false"
          />
        </a-form-model-item>
        <a-form-model-item
          label="新密码:"
          prop="newPwd"
        >
          <a-input-password
            v-model.trim="formResetUser.newPwd"
            autocomplete="false"
          />
        </a-form-model-item>
        <a-form-model-item
          label="密码确认:"
          prop="pwdConfirm"
        >
          <a-input-password
            v-model.trim="formResetUser.pwdConfirm"
            autocomplete="false"
          />
        </a-form-model-item>
      </a-form-model>
    </base-modal-form>
  </div>
</template>

<script>
import bus from '@/lib/bus.js'
import { mapActions } from 'vuex'
// 主题设置窗口
import baseDrawerTheme from '@/components/base-drawer-theme'
import defaultSettings from '@/config/theme-default'
// 导入基础组件
import baseModalForm from '@/components/base-modal-form'

// 导入请求的接口
/* import { getUserByID } from '@/api/config'
import { postChangePassword } from '@/api/public' */
// 导入公用的函数
import { onRecursive, EncryptMD5, closeTimer } from '@/lib/common'

export default {
  components: {
    baseDrawerTheme,
    baseModalForm
  },
  data() {
    const rep = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}$/
    // 新密码复杂度验证
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (!rep.test(value)) {
        callback(new Error('用户密码复杂度不够，至少8个字符，包含数字、小写或大写字母。'))
      } else {
        callback()
      }
    }

    return {
      // 是否锁屏
      isLock: false,
      // 菜单栏是否展开
      collapsed: false,
      // 主题弹窗是否展开
      visible: false,

      /** * *** 密码重置 *****/
      // 密码修改弹窗显示与隐藏
      userVisible: false,
      // 密码修改实体
      formResetUser: {
        userID: 0,
        userCode: '',
        userName: '',
        oldPwd: '',
        newPwd: '',
        pwdConfirm: ''
      },
      // 密码修改数据校验规则
      formResetUserRules: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, validator: validatePwd, trigger: 'blur' }
        ],
        pwdConfirm: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    breadcrumbItems() {
      let result = []
      const path = this.$route.path
      const data = onRecursive(this.mixin_routes, 'children', 'path', path)
      if (data) {
        result = data.tag || []
      }
      return result
    }
  },
  created() {
    window.addEventListener('resize', this.onResize)
    this.initTheme()
  },
  deactivated() {
    window.removeEventListener('resize', this.onResize)
  },
  mounted() {
    this.onResize()
  },
  beforeDestroy() {
  },
  methods: {
    ...mapActions(['SignOut']),
    // 菜单栏收缩
    onCollapsed() {
      this.collapsed = !this.collapsed
      bus.$emit('collapsed', this.collapsed)
    },
    // 根据屏幕的宽度，来自动控制菜单栏的收缩
    onResize() {
      if (document.body.clientWidth <= 1600) {
        if (!this.collapsed) {
          this.onCollapsed()
        }
      }
    },
    // 锁屏事件
    onLockScreen() {
      sessionStorage.setItem('lock-screen', true)
      bus.$emit('lock', true)
      closeTimer()
    },
    // 下拉菜单栏操作
    async handleMenuClick(e) {
      // 密码修改
      if (e.key === '0') {
        this.onPasswordReset()

        // 帮助文档
      } else if (e.key === '1') {
        this.$message.success('暂无帮助文档！')

        // 升级说明
      } else if (e.key === '2') {
        const routeData = this.$router.resolve({
          path: '/update-instructions',
          query: {
            userID: this.mixin_user.userID
          }
        })
        window.open(routeData.href, '_blank')

        // 退出登录
      } else if (e.key === '9') {
        const { SignOut } = this
        // 获取登录参数
        const appID = this.mixin_user.appID
        const userID = this.mixin_user.userID
        const authCode = this.mixin_user.authCode
        // 生成登出参数
        const params = {
          url: this.$config.PublicUrl,
          param: {
            authCode,
            userID
          }
        }
        // 登出
        SignOut(params).then((res) => {
          this.$store.commit('CLEARROUTERS')
          // 退出登录，跳转到登录页面
          this.$router.push({
            path: '/login',
            query: {
              appID
            }
          })
        }).catch((err) => {
          const message = err.message || err
          this.$message.warning(message)
        })
      }
    },

    /** *********************************************密码修改****************************************** */
    // 密码修改弹窗
    async onPasswordReset() {
      // 参数
      const param = {
        userID: this.mixin_user.userID
      }
      // 根据ID获取用户信息
      const result = await getUserByID(this.$config.PublicUrl, param)
      if (result && result.code === 1) {
        const user = result.response || {}
        this.formResetUser.userCode = user.userCode
        this.formResetUser.userName = user.userName
        this.formResetUser.userID = user.userID
        this.userVisible = true
      }
    },
    // 密码修改提交
    handleResetOk() {
      this.$refs.formResetUserRef.validate(async valid => {
        if (!valid) return false
        // 数据校验
        const newPwd = this.formResetUser.newPwd
        const pwdConfirm = this.formResetUser.pwdConfirm

        if (newPwd !== pwdConfirm) {
          this.$message.warning('新密码与确认密码不一致！')
          return false
        }

        // 参数
        const param = {
          instBTSID: this.mixin_user.instBTSID,
          newPassword: EncryptMD5(this.formResetUser.newPwd),
          userID: this.mixin_user.userID,
          userPassword: EncryptMD5(this.formResetUser.oldPwd)
        }

        // 保存
        const result = await postChangePassword(this.$config.PubicUrl, param)
        if (result.code === 1) {
          this.$message.success('密码修改成功！')
          this.handleReset()
        } else {
          this.$message.error((result && result.error) || '密码修改失败！')
        }
      })
    },
    // 密码修改弹窗取消
    handleResetCancel() {
      this.handleReset()
    },
    // 密码修改数据初始化
    handleReset() {
      this.$refs.formResetUserRef.resetFields()
      this.formResetUser = {
        userCode: '',
        userName: '',
        oldPwd: '',
        newPwd: '',
        pwdConfirm: ''
      }
      this.userVisible = false
    },

    /** *********************************************主题设置****************************************** */
    // 设置主题部分
    initTheme() {
      // 先获取本地设置的主题，若为空，则取默认的主题
      // 获取本地的主题样式
      const themeStyle = sessionStorage.getItem('THEME_MENU')
      const themeColor = sessionStorage.getItem('THEME_COLOR')
      this.$store.commit('SET_THEME', {
        THEME_MENU: themeStyle && themeStyle !== '' ? themeStyle : defaultSettings.navTheme,
        THEME_COLOR: themeColor && themeColor !== '' ? themeColor : defaultSettings.primaryColor
      })
    },
    // 主题部分
    onThemeOpen() {
      this.visible = true
    },
    // 主题设置弹窗关闭
    onClose() {
      this.visible = false
    }
  }
}
</script>

<style lang="css" scoped>
.header {
  height: 50px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  top: -13px;
}

.nav-left li {
  float: left;
  position: relative;
}

.nav-right li {
  float: right;
  position: relative;
}

.nav-item {
  height: 50px;
  width: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
}

.nav-item::before {
  content: "";
  width: 0;
  height: 2px;
  background: #000;
  position: absolute;
  top: -1px;
  left: 50%;
  transition: all 0.3s;
}

.nav-item:hover:before {
  left: 0%;
  width: 100%;
}

.nav-breadcrumb {
  height: 50px;
  padding: 0 5px;
}

.nav-breadcrumb .ant-breadcrumb {
  line-height: 50px;
}

.nav-menu {
  padding: 0 10px;
}

.active {
  width: 50px !important;
}

.hidden {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  transition: width 0.2s;
  border-top: 2px solid black;
}

.nav-phone-input {
  width: auto;
}

.nav-phone-input label {
  font-size: 16px;
}

.nav-phone-input::before {
  transition: none;
  height: 0;
}

.common >>> .ant-badge-count {
  min-width: 16px;
  height: 16px;
  padding: 0 0px;
  font-size: 12px;
  line-height: 16px;
  background: #f5222d;
  border-radius: 8px;
}

.common >>> .ant-badge {
  font-size: 20px;
}

.message-animate {
  animation: messageAnimate 0.5s ease-in-out infinite alternate;
  -o-animation: messageAnimate 0.5s ease infinite alternate;
  -moz-animation: messageAnimate 0.5s ease infinite alternate;
  -webkit-animation: messageAnimate 0.5s ease infinite alternate;
  animation-play-state: running;
  -o-animation-play-state: running;
  -moz-animation-play-state: running;
  -webkit-animation-play-state: running;
}

@keyframes messageAnimate {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@-moz-keyframes messageAnimate {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@-o-keyframes messageAnimate {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@-webkit-keyframes messageAnimate {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
.ant-avatar-online {
  position: relative;
}

/* .nav-menu-online::after {
  content: "";
  position: absolute;
  display: block;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: #00ff00;
  top: 38px;
  left: 38px;
} */

.nav-menu-offline::after {
  content: "";
  position: absolute;
  display: block;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: red;
  top: 38px;
  left: 38px;
}

.nav-message-box {
  width: 200px;
  margin: 0;
  padding: 0;
}

.nav-message-box li {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 5px 5px 10px 5px;
  cursor: pointer;
  display: flex;
}

.nav-message-box li:hover {
  background-color: #eee;
}

.nav-message-box li img {
  height: 40px;
  width: 40px;
  vertical-align: top;
}

.nav-message-box li div {
  flex: 1;
  height: 100%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.nav-message-box li div span {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-message-box li div span:last-child {
  font-size: 12px;
  color: #ccc;
}
</style>
