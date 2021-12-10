<template>
  <div>
    <a-menu
      mode="inline"
      theme="dark"
      :selected-keys="selectRoute"
      :open-keys="openKeys"
      @openChange="onOpenChange"
    >
      <template v-for="item in menus">
        <a-sub-menu
          :key="item.menuID"
          v-if="item.children.length > 0"
        >
          <span slot="title">
            <a-icon :type="item.picName" />
            <span>{{ item.menuShortName }}</span>
          </span>
          <template v-for="itSubMenu in item.children">
            <a-sub-menu
              :key="itSubMenu.menuID"
              :title="itSubMenu.menuShortName"
              v-if="itSubMenu.children.length > 0"
            >
              <a-menu-item
                v-for="itFun in itSubMenu.children"
                :key="itFun.objectName"
                @click="onClick(itFun.objectName)"
              >
                <router-link :to="itFun.objectName">{{ itFun.menuShortName }}</router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item
              v-else
              :key="itSubMenu.objectName"
              @click="onClick(itSubMenu.objectName)"
            >
              <router-link :to="itSubMenu.objectName">{{ itSubMenu.menuShortName }}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item
          v-else
          :key="item.objectName"
          @click="onClick(item.objectName)"
        >
          <router-link :to="item.objectName">{{ item.menuShortName }}</router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bus from '@/lib/bus'

export default {
  data() {
    return {
      selectRoute: [],
      openKeys: [],
      rootSubmenuKeys: [],
      menu: [],
      appName: ''
    }
  },
  computed: {
    ...mapState({
      initMenus: (state) => state.permission.menus,
      openRoutes: (state) => state.permission.openRoutes
    })
  },
  watch: {
    $route(newValue, oldValue) {
      // 查询当前的路由是否有权限
      if (this.selectRoute.length > 0) {
        this.selectRoute = []
      }
      this.selectRoute.push(newValue.path)
      // 将当前激活的页面路径保存到sessionStorage中
      sessionStorage.setItem('RoutePath', newValue.path)
    }
  },
  created() {
    const session = window.SessionStorage.getItem('AccessToken')
    if (session !== '' && session) {
      const obj = JSON.parse(session)
      if (obj.groupOrder) {
        this.appName = obj.appName
        this.menus = this.initMenus.filter((it) => {
          return it.menuGroupOrder === obj.groupOrder
        })
      } else {
        this.menus = this.initMenus
      }
    }

    bus.$on('collapsed', val => {
      if (val) {
        this.openKeys = []
      } else {
        this.openKeys = sessionStorage.getItem('openKeys') ? JSON.parse(sessionStorage.getItem('openKeys')) : []
      }
    })
  },
  mounted() {
    this.selectRoute.push(
      sessionStorage.getItem('RoutePath')
        ? sessionStorage.getItem('RoutePath')
        : ''
    )
    // 将含有子集的 menuID放到根节点集合
    this.menus.forEach((item) => {
      if (item.children.length > 0) {
        this.rootSubmenuKeys.push(item.menuID)
      }
    })
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      )
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
      sessionStorage.setItem('openKeys', JSON.stringify(this.openKeys))
    },
    onClick(path) {
      const index = this.openRoutes.findIndex((item) => item.path === path)
      if (this.openRoutes && this.openRoutes.length === 10 && index < 0) {
        this.$emit('openClick', this.openRoutes)
      }
    }
  }
}
</script>
<style lang="css" scoped>
</style>
