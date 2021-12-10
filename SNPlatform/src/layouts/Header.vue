<template>
  <ul class="layout-header">
    <li class="layout-header-item">
      <a-icon
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="onCollapsed"
      />
    </li>
    <li class="layout-header-breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <router-link to="/Desktop">
            <a-icon type="home" />
          </router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item
          v-for="(item, index) in breadcrumbs"
          :key="index"
        >
          {{ item }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </li>
    <li></li>
    <li class="layout-header-item item-login-info">
      <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <a-dropdown>
        <a
          class="ant-dropdown-link"
          @click="e => e.preventDefault()"
        >
          机构管理员
          <a-icon type="caret-down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a-icon type="lock" />
            <span>密码修改</span>
          </a-menu-item>
          <a-menu-item>
            <a-icon type="question-circle" />
            <span>帮助文档</span>
          </a-menu-item>
          <a-menu-item>
            <a-icon type="info-circle" />
            <span>升级说明</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item>
            <a-icon
              type="poweroff"
              style="color:red;"
            />
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </li>
    <li
      class="layout-header-item"
      title="设置"
    >
      <a-icon
        type="more"
        @click="onSetting"
      />
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      // 菜单栏展开
      collapsed: false
    }
  },
  computed: {
    breadcrumbs() {
      const route = this.$route
      return (route.meta && route.meta.tag) || []
    }
  },
  mounted() {
  },
  methods: {
    // 菜单栏收缩
    onCollapsed() {
      this.collapsed = !this.collapsed
      this.Emitter.$emit('event-collapse', this.collapsed)
    },
    // 设置
    onSetting() {

    }
  }
}
</script>
<style lang="less" scoped>
@HeaderHeight: 56px;

.layout-header {
  display: flex;
  height: @HeaderHeight;
  background-color: #fff;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

  li:first-child,
  li:last-child {
    height: @HeaderHeight;
    width: @HeaderHeight;
    line-height: @HeaderHeight;
    text-align: center;
    font-size: 20px;
  }

  li:not(.layout-header-item) {
    flex: 1;
  }

  li.layout-header-item {
    position: relative;
    line-height: @HeaderHeight;
  }

  li.layout-header-breadcrumb {
    padding: 18px 10px;
  }

  li.item-login-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  li.layout-header-item::before {
    content: "";
    width: 0;
    height: 3px;
    background: #000;
    position: absolute;
    top: -1px;
    left: 50%;
    transition: all 0.3s;
  }

  li.layout-header-item:hover::before {
    left: 0;
    width: 100%;
  }
}
</style>
