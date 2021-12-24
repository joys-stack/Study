<template>
  <i :class="'ex-icon-' + type"></i>
</template>
<script>
export default {
  name: 'ExIcon',
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>