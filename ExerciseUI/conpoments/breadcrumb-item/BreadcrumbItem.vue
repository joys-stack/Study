<template>
  <span class="ex-breadcrumb--item">
    <!-- 内容 -->
    <span
      :class="['ex-breadcrumb--inner', to ? 'is-link' : '']"
      ref="link"
      role="link"
      @click="onClick"
    >
      <slot></slot>
    </span>
    <!-- 分隔符 -->
    <i
      v-if="separatorIcon"
      class="ex-breadcrumb--separator"
      :class="separatorIcon"
    ></i>
    <span
      v-else
      class="ex-breadcrumb--separator"
      role="presentation"
    >{{separator}}</span>
  </span>
</template>
<script>
export default {
  name: 'ExBreadcrumbItem',
  props: {
    to: [String, Object],
    replace: Boolean
  },
  inject: ['ExBreadcrumb'],
  data() {
    return {
      separator: '',
      separatorIcon: ''
    }
  },
  mounted() {
    this.separator = this.ExBreadcrumb.separator
    this.separatorIcon = this.ExBreadcrumb.separatorIcon
  },
  methods: {
    onClick() {
      const { to, $router } = this
      if (!to || !$router) return
      // 通过replace跳转不可回退
      this.replace ? $router.replace(to) : $router.push(to);
    }
  }
}
</script>