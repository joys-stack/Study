<template>
  <button
    @click="onClick"
    :class="['ex-button', 
             'ex-button--' + type, 
             size !== ''? 'ex-button--' + size: '',
             circle ? 'ex-button--circle': '']"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ExButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: ''
    },
    round: Boolean,
    circle: Boolean
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="less">
@import url(./style/button.less);
</style>