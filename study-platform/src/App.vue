<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data() {
    return {
      locale: zhCN // 国际化 设置成中文
    }
  }
}
</script>
<style lang="less">
</style>
