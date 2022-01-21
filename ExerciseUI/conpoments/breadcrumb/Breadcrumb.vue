<template>
  <div
    class="ex-breadcrumb"
    aria-label="Breadcrumb"
    role="navigation"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ExBreadcrumb',
  props: {
    // 分隔符
    separator: {
      type: String,
      default: '/'
    },
    // 分割图标
    separatorIcon: {
      type: String,
      defualt: ''
    }
  },
  provide() {
    return {
      ExBreadcrumb: this
    }
  },
  mounted() {
    // 当前对象
    const el = this.$el
    // 获取所有子对象
    const listEL = el.querySelectorAll('ex-breadcrumb--item')
    if (listEL.length) {
      // 最后一个标签设置属性 TODO  暂时不明白这个属性设置的含义
      listEL[listEL.length - 1].setAttribute('aria-current', 'page')
    }
  }
}
</script>