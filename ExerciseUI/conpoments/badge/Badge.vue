<template>
  <div class="ex-badge">
    <slot></slot>
    <transition name="ex-zoom-in-center">
      <sup
        v-show="!hidden && (content || value > 0 || isDot)"
        :class="['ex-badge--content', 'ex-badge--content--' + type, { 'is-dot': isDot, 'is-fixed': $slots.default}]"
      >{{content}}</sup>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'ExBadge',
  props: {
    // 需要展示的内容
    value: [String, Number],
    // 展示的最大数量
    max: {
      type: Number,
      default: 99,
      validator(value) {
        return typeof value === 'number'
      }
    },
    // 圆点
    isDot: Boolean,
    // 是否隐藏
    hidden: Boolean,
    type: {
      type: String,
      default: 'danger',
      validator(value) {
        return ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
      }
    }
  },
  computed: {
    content() {
      if (this.isDot) return
      // 值是数字类型，但是数量为0不显示
      if (typeof this.value === 'number' && this.value <= 0) return

      let content = ''
      // 设置值是否是字符串类型
      if (typeof this.value === 'string') {
        content = this.value
      }
      content = `${this.value > this.max ? `${this.max}+` : this.value}`
      return content
    }
  }
}
</script>