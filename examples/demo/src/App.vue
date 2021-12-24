<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app,
html,
body {
  height: 100%;
}

*{
  margin: 0;
}

ul{
  list-style: none;
}

a{
  text-decoration: none;
}
</style>
