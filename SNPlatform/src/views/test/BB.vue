<template>
  <div>
    B页面
    <button @click="count++">点击</button>
    <span>{{count}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>
