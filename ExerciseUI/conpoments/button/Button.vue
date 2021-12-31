<template>
  <button
    :class="['ex-button',
      type ? 'ex-button--' + type : '',
      size ? 'ex-button--' + size : '',{
       'is-loading': loading,
       'is-round': round,
       'is-circle': circle,
       'is-plain': plain,
       'is-disabled': disabled
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- 按钮加载 -->
    <i class="ex-icon-loading" v-if="loading"></i>
    <!-- 按钮图标 -->
    <i :class="'ex-icon-' + icon" v-if="icon && !loading"></i>
    <!-- 按钮文字 -->
    <span>
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: 'ExButton',
  props: {
    // 按钮类型
    type: {
      type: String,
      default: 'default'
    },
    // 按钮大小
    size: {
      type: String,
      default: 'medium'
    },
    // 按钮图标
    icon: {
      type: String,
      default: ''
    },
    // 加载按钮
    loading: Boolean,
    // 圆角按钮
    round: Boolean,
    // 圆形按钮
    circle: Boolean,
    // 朴素按钮
    plain: Boolean,
    // 按钮禁用
    disabled: Boolean
  },
  methods: {
    // 点击事件提交
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="less" scoped>
</style>