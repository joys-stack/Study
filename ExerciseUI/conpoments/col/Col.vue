<template>
  <div
    :class="['ex-col', classs]"
    :style="style"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ExCol',
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    },
    pull: {
      type: Number,
      default: 0
    },
    push: {
      type: Number,
      default: 0
    },
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
    xxl: [Number, Object]
  },
  computed: {
    gutter() {
      const parent = this.$parent
      while (parent && parent.$options.name !== 'ExRow') {
        parent = parent.$parent
      }
      return parent ? parent.gutter : 0
    },
    style() {
      const st = {}
      st.paddingLeft = `${this.gutter / 2}px`
      st.paddingRight = st.paddingLeft
      return st
    },
    classs() {
      const classes = []
      // 布局属性
      let arr = ['span', 'offset', 'pull', 'push']
      arr.forEach(item => {
        classes.push(`ex-col-${item}-${this[item]}`)
      })

      // 响应式
      arr = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
      arr.forEach(size => {
        // 判断参数是字符串还是对象
        if (this[size] && (typeof this[size] === 'number')) {
          classes.push(`ex-col-span${size}-${this[size]}`)
        } else if (this[size] && (typeof this[size] === 'object')) {
          const propObj = this[size]
          Object.keys(propObj).forEach(prop => {
            classes.push(`ex-col-${prop}-${size}-${propObj[prop]}`)
          })
        }
      })

      return classes
    }
  }
}
</script>