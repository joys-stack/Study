<template>
  <div
    :class="['ex-row',
       type? 'ex-row--' + type : '',
       justifyContent? 'ex-row--h-' + justifyContent : '',
       alignItems? 'ex-row--v-' + alignItems : ''
    ]"
    :style="style"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ExRow',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    // 布局类型 flex, gird
    type: {
      type: String,
      default: 'flex'
    },
    justifyContent: {
      type: String,
      default: 'flex-start'
    },
    alignItems: {
      type: String,
      default: 'center'
    }
  },
  computed: {
    style() {
      const st = {}
      st.marginLeft = `-${this.gutter / 2}px`
      st.marginRight = st.marginLeft
      return st
    }
  }
}
</script>