<template>
  <div>
    <Header ref="HeaderRef"></Header>
  </div>
</template>
<script>
import Header from './Header.vue'
export default {
  name: 'Control',
  components: {
    Header
  },
  mounted() {
    this.InitToolBar()
  },
  methods: {
    // 初始化 ToolBar
    InitToolBar() {
      this.$refs.HeaderRef.RegisterToolbar([{
        name: 'Min',
        ico: 'minus',
        title: '最小化'
      }, {
        name: 'Close',
        ico: 'close',
        title: '关闭'
      }])
    }
  }
}
</script>
<style lang="css" scoped>
</style>