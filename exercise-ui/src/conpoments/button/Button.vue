<template>
  <button
    @click="onClick"
    :disabled="buttonDisabled"
    :class="['ex-button', 
             'ex-button--' + type, 
             'ex-button--' + size,
             {
               'is-plain': plain,
               'is-round': round,
               'is-circle': circle,
               'is-loading': loading,
               'is-disabled': disabled
             }]"
  >
    <!-- 加载图标 -->
    <ex-icon
      type="loading"
      v-if="loading"
    ></ex-icon>
    <!-- 自定义按钮图标 -->
    <i
      :class="`icon-${icon}`"
      v-if="icon && !loading"
    ></i>
    <!-- 作用域插槽 -->
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ExButton',
  // 注解
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'medium'
    },
    icon: String,
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    loading: Boolean,
    disabled: Boolean
  },
  computed: {
    buttonDisabled() {
      return this.$options.propsData.hasOwnProperty('disabled') ? this.disabled : (this.elForm || {}).disabled;
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="less" scoped>
@import url(./style/button.less);
</style>