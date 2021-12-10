<template>
  <div class="nav">
    <ul
      class="nav-tabs"
      ref="navUlRef"
    >
      <li :class="{'active': isActive('/index')}">
        <router-link
          to="/index"
          class="nav-link"
        >
          <a-icon type="home" />
        </router-link>
      </li>
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <router-link
          :to="item.path"
          class="nav-link"
        >
          {{item.title}}
        </router-link>
        <span
          @click.prevent="closeTags(index)"
          class="tabs-li-close"
        >
          <a-icon type="close" />
        </span>
      </li>
    </ul>
    <div
      class="tabs-control tabs-prev"
      @click="onLeft"
    >
      <a-icon type="double-left" />
    </div>
    <div
      class="tabs-control tabs-last"
      @click="onRight"
    >
      <a-icon type="double-right" />
    </div>
    <div class="tabs-control tabs-down">
      <a-dropdown>
        <a
          class="ant-dropdown-link"
          @click="e => e.preventDefault()"
        >
          <a-icon type="down" />
        </a>
        <a-menu
          slot="overlay"
          @click="onClick"
        >
          <a-menu-item key="other">
            <a href="javascript:;">关闭其他</a>
          </a-menu-item>
          <a-menu-item key="all">
            <a href="javascript:;">关闭全部</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import bus from '@/lib/bus.js'
import { onRecursive } from '@/lib/common'
/* import { postAppOperate } from '@/api/log' */
export default {
  data() {
    return {
      tagsList: []
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue)
    }
  },
  created() {
    this.setTags(this.$route)
  },
  methods: {
    // 判断是当前的标签是否激活
    isActive(path) {
      return path === this.$route.path
    },
    // 设置标签
    setTags(route) {
      // if (this.$route.path.replace('/', '') === '404') return
      if (this.$route.path.toString() === '/index') return

      const isExist = this.tagsList.some(item => {
        return item.path === route.path
      })

      if (!isExist) {
        this.tagsList.push({
          title: route.meta.title,
          path: route.path,
          name: route.name
        })
      }
      bus.$emit('tags', this.tagsList)
      this.$store.commit('SETOPENROUTES', this.tagsList)

      // 写入页面访问日志
      try {
        const data = onRecursive(this.$store.state.permission.menus, 'children', 'objectName', route.path)
        const data2 = onRecursive(this.$store.state.permission.addRouters, 'children', 'path', route.path)
        const user = this.$store.state.user.token
        if (data && data2) {
          // 生成描述
          let description = '用户【' + user.userName + '】打开：'
          data2.tag.forEach(item => {
            description += '【' + item + '】-'
          })
          description += '功能'
          const param = {
            appID: parseInt(data.appID),
            description,
            instID: user.instBTSID,
            menuID: parseInt(data.menuID),
            operater: user.userID,
            rCreator: user.userID,
            subMenuID: parseInt(data.parentMenuID)
          }
          postAppOperate(window.config.PublicUrl, param)
        }
      } catch (error) {

      }
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0]
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
      if (item) {
        delItem.path === this.$route.path && this.$router.push({ path: item.path }, onComplete => { }, onAbort => { })
      } else {
        this.$router.push({ path: '/home' }, onComplete => { }, onAbort => { })
      }
      bus.$emit('tags', this.tagsList)
      this.$store.commit('SETOPENROUTES', this.tagsList)
    },
    // 关闭其他或关闭全部
    onClick({ key }) {
      if (key.toUpperCase() === 'OTHER') {
        const curItem = this.tagsList.filter((item, index) => {
          return item.path === this.$route.fullPath
        })
        this.tagsList = curItem
        this.$store.commit('SETOPENROUTES', this.tagsList)
      } else if (key.toUpperCase() === 'ALL') {
        this.tagsList = []
        // 先将数据提交到仓库，后进行页面跳转，否则会有一个BUG
        this.$store.commit('SETOPENROUTES', this.tagsList)
        this.$router.push({ path: '/home' }, onComplete => { }, onAbort => { })
      }
    },
    onLeft() {
    },
    onRight() {
    }
  }
}
</script>
<style lang="less" scoped>
.nav {
  height: 38px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  top: -13px;
}

/** tab导航栏样式 */
.nav-tabs {
  height: 38px;
  line-height: 38px;
  padding: 0 76px 0 38px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border: 0;
  overflow: hidden;
  -webkit-transition: none;
  transition: none;
  z-index: 998;
  white-space: nowrap;
  font-size: 0;
}

.left {
  left: 0 !important;
}

.right {
  right: 0 !important;
}

.nav-tabs li {
  min-width: auto;
  line-height: 38px;
  padding: 0 30px 0 0;
  border-right: 1px solid #f6f6f6;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
  display: inline-block;
  font-size: 14px;
  position: relative;
  text-align: center;
  cursor: pointer;
}

.nav-tabs li:first-child,
.nav-tabs li:first-child .nav-link {
  padding: 0 7px;
}

.nav-tabs li:hover {
  background-color: #f6f6f6;
}

.nav-link {
  height: 100%;
  width: 100%;
  display: block;
  padding-left: 15px;
}

.nav-tabs .tabs-li-close {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 10px;
  border-radius: 50%;
  position: absolute;
  top: 11px;
  right: 8px;
  -webkit-transition: background-color 0.2s, color 0.2s;
  transition: background-color 0.2s, color 0.2s;
}

.tabs-li-close:hover {
  background-color: #ff5722;
  color: #fff;
}

.nav-link {
  color: #595959;
}

.active {
  background-color: #f6f6f6;
  color: #000;
  font-weight: 500;
}

.active a {
  color: #000;
  font-weight: 500;
}

.active::after {
  height: 2px;
  border: 0;
  border-radius: 0;
  background-color: #191a23;
  position: absolute;
  left: 0;
  top: 0;
  content: "";
  width: 100%;
  box-sizing: border-box;
  pointer-events: none;
}

/** 左、右、下按钮样式 */
.tabs-control {
  position: absolute;
  top: 0;
  width: 38px;
  height: 38px;
  line-height: 38px;
  background-color: #fff;
  border-left: 1px solid #f6f6f6;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
  text-align: center;
  cursor: pointer;
  z-index: 998;
}

.tabs-control:hover {
  background-color: #f6f6f6;
}

.tabs-control.tabs-prev {
  left: 0;
  border-left: none;
  border-right: 1px solid #f6f6f6;
}

.tabs-control.tabs-last {
  right: 38px;
}

.tabs-control.tabs-down {
  right: 0;
}

.ant-dropdown-link {
  display: block;
  height: 100%;
  width: 100%;
  color: #595959;
}
</style>
