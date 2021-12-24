<template>
  <div class="hello">
    <ex-icon type="loading"></ex-icon>
    <ex-button
      @click="onClick"
      type="plain"
      size="medium"
      :loading="false"
    >朴素</ex-button>
    <ex-button
      @click="onClick"
      type="primary"
      size="medium"
      :loading="false"
    >点击</ex-button>
    <ex-button
      @click="onClick"
      type="success"
      size="medium"
      :loading="false"
    >点击</ex-button>
    <ex-button
      @click="onClick"
      type="warning"
      size="medium"
      :loading="false"
    >点击</ex-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    onClick(e) {
      console.dir(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
}
</style>
