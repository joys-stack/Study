<template>
  <transition name="ex-alert-fade">
    <div
      :class="['ex-alert', 
          'ex-alert--' + type, 
          {
            'is-center': center,
          }, 
          'is-'+ effect]"
      v-show="visible"
    >
      <!-- 是否显示图标 -->
      <i
        v-if="showIcon"
        :class="['ex-alert--icon', 'ex-icon-' + type, isBigIcon]"
      ></i>
      <div class="ex-alert--content">
        <!-- 标题 -->
        <span
          v-if="title || $slots.title"
          :class="['ex-alert--title', isBoldTitle]"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <!-- 内容 -->
        <p
          class="ex-alert--description"
          v-if="description || $slots.default"
        >
          <slot>{{description}}</slot>
        </p>
        <!-- 关闭 -->
        <i
          class="ex-alert--closebtn"
          :class="{ 'is-customed': closeText !== '', 'ex-icon-close': closeText === '' }"
          v-show="closable"
          @click="close()"
        >{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ExAlert',
  props: {
    // 文字内容是否居中
    center: Boolean,
    // 主题类型
    effect: {
      type: String,
      default: 'light',
      // 校验值是否有效，无效使用默认值
      validator: (value) => {
        return ['dark', 'light'].indexOf(value) !== -1
      }
    },
    // 是否显示图标
    showIcon: Boolean,
    // 类型
    type: {
      type: String,
      default: 'info',
      validator: value => {
        return ['info', 'success', 'warning', 'error'].indexOf(value) !== -1
      }
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 内容
    description: {
      type: String,
      default: ''
    },
    // 自定义关闭的内容
    closeText: {
      type: String,
      default: ''
    },
    // 是否允许关闭
    closable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isBigIcon() {
      return this.description || this.$slots.default ? 'is-big' : ''
    },
    isBoldTitle() {
      return this.description || this.$slots.default ? 'is-bold' : ''
    }
  },
  data() {
    return {
      visible: true
    }
  },
  methods: {
    close(e) {
      this.visible = false
      this.$emit('close', e)
    }
  }
}
</script>