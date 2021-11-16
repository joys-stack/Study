<template>
  <div>
    <Header ref="HeaderRef"></Header>
    <div>4899 端口接受了进来的连结</div>
  </div>
</template>

<script>
import Header from './Header.vue'
require('../main/utils/peer-puppet')

export default {
  name: "Main",
  components: {
    Header
  },
  data() {
    return {
    };
  },
  mounted() {
    // 初始化 ToolBar
    this.InitToolBar()
  },
  beforeUnmount() {
  },
  methods: {
    // 初始化 ToolBar
    InitToolBar() {
      this.$refs.HeaderRef.RegisterToolbar([{
        name: 'Hide',
        ico: 'close',
        title: '关闭'
      }])
    }
  },
};
</script>

<style>
</style>
