<template>
  <div class="layout-sider">
    <div class="layout-sider-logo"></div>
    <a-menu
      theme="dark"
      mode="inline"
      :selectedKeys="selectedKeys"
    >
      <template v-for="item in TreeRoutes">
        <a-sub-menu
          v-if="item.children.length>0"
          :key="item.MenuID"
        >
          <span slot="title">
            <a-icon :type="item.MenuPic" />
            <span>{{ item.MenuSName }}</span>
          </span>
          <template v-for="it in item.children">
            <a-menu-item :key="it.RoutePath">
              <router-link :to="it.RoutePath">{{ it.MenuSName }}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item
          v-else
          :key="item.RoutePath"
        >
          <router-link :to="item.RoutePath">{{ item.MenuSName }}</router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      selectedKeys: []
    }
  },
  computed: {
    ...mapState({
      TreeRoutes: state => state.permission.TreeRoutes,
      Session: state => state.session.Session
    })
  },
  watch: {
    $route(n, o) {
      this.selectedKeys = []
      this.selectedKeys.push(n.path)
      this.$store.commit('SET_ROUTEPATH', n.path)
    }
  },
  mounted() {
    if (this.Session.RoutePath) {
      this.selectedKeys.push(this.Session.RoutePath)
    }
    console.log(this.TreeRoutes)
  }
}
</script>
<style lang="less" scoped>
.layout-sider {
  height: 100%;

  .layout-sider-logo {
    height: 56px;
  }
}
</style>
