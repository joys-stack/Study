<template>
  <i :class="[`icon-${type}`]"></i>
</template>
<script>
export default {
  name: 'ExIcon',
  props: {
    type: String
  }
}
</script>
<style lang="less" scoped>
@import url(./style/icon.less);
</style>