<template>
  <div
    class="ex-card"
    :class="`is-${shadow}-shadow`"
  >
    <!-- card头部 -->
    <div
      class="ex-card--header"
      v-if="$slots.header || header"
    >
      <slot name="header">{{header}}</slot>
    </div>
    <!-- card body -->
    <div
      class="ex-card--body"
      :style="bodyStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExCard',
  props: {
    header: String,
    // 阴影显示时机
    shadow: {
      type: String,
      default: 'always',
      validator: value => {
        return ['always', 'never', 'hover'].includes(value)
      }
    },
    bodyStyle: Object
  }
}
</script>