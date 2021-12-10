<template>
  <div>
    <div :class="['img-check ', theme===checkTheme ? 'check' :'']">
      <img
        class="img"
        :src="require('../assets/images/theme/' + src)"
        @click="onClick(theme)"
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      Type: String,
      default: ''
    },
    top: {
      type: Number,
      default: 20
    },
    left: {
      type: Number,
      default: 40
    },
    theme: {
      Type: String,
      default: ''
    },
    checkTheme: {
      Type: String,
      default: 'theme-dark'
    }
  },
  methods: {
    onClick(val) {
      this.$emit('checkChange', val)
    }
  }
}
</script>

<style lang="css" scoped>
.img-check {
  position: relative;
  height: 62px;
  width: 93px;
  padding:5px;
}

.img {
  cursor: pointer;
  display: inline-block;
  height: 50px;
  width: 80px;
}
</style>
