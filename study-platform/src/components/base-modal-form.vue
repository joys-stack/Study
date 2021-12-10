<!--
@Author DZY
@Description 封装组件-表单输入弹窗
@CreateDate 2020-12-11
@ModifyAuthor
@ModifyDate
@ModifyDescription
-->
<template>
  <a-modal
    class="base-modal"
    ref="modalRef"
    :title="title"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    :ok-text="okText"
    :cancel-text="cancelText"
    :maskClosable="maskClosable"
    :width="width"
    :bodyStyle="bodyStyle"
    :footer="footer? undefined : null"
    :destroyOnClose="destroyOnClose"
    :forceRender="true"
    v-dialogDrag="dragParam"
  >
    <slot></slot>
    <!-- 底部按钮自定义插槽 -->
    <template
      :slot="slot"
      v-for="slot in Object.keys($slots).filter(key => key === 'footer') "
    >
      <slot :name="slot"></slot>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: '提交'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    visible: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    bodyStyle: {
      type: Object,
      default: function () {
        return {}
      }
    },
    footer: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    dragParam: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  mounted() {
  },
  methods: {
    handleOk() {
      this.$emit('ok')
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="css" scoped>
</style>
