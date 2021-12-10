<template>
  <div class="error-page">
    <div>
      <h1><img src="../../assets/images/404.gif" /></h1>
    </div>
    <div class="error-desc">哎哟~ 你所访问的页面不存在哦</div>
    <div class="error-handle">
<!--       <a-button
        type="primary"
        size="large"
        @click="goForwards"
      >返回首页</a-button> -->
      <a-button
        class="error-btn"
        type="primary"
        size="large"
        @click="goBack"
      >返回上一页</a-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-2)
    },
    goForwards() {
      this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
}
.error-desc {
  font-size: 30px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
  padding-bottom: 200px;
}
.error-btn {
  /* margin-left: 100px; */
}
</style>
