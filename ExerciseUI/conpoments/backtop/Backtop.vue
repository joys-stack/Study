<template>
  <transition name="ex-fade-in">
    <div
      v-if="visible"
      class="ex-backtop"
      @click.stop="onClick"
      :style="{right: right+ 'px', bottom: bottom + 'px'}"
    >
      <!-- 默认插槽 -->
      <slot>
        <!-- 默认图标， 可以通过插槽自定义图标 -->
        <ex-icon type="caret-top"></ex-icon>
      </slot>
    </div>
  </transition>
</template>
<script>
// 导入节流
import { throttle } from 'throttle-debounce'

export default {
  name: 'ExBacktop',
  props: {
    right: {
      type: Number,
      default: 20
    },
    bottom: {
      type: Number,
      default: 20
    },
    // 当滚轮滑动的距离为200，则显示按钮
    visibilityHeight: {
      type: Number,
      default: 200
    },
    // 目标对象，设置指定的盒子对象
    traget: [String]
  },
  data() {
    return {
      visible: false,
      // 容器对象
      container: null,
      // 根节点对象
      el: null
    }
  },
  mounted() {
    this.init()
    this.scrollHandler = throttle(300, this.onScroll)
    // 注册滚动事件
    this.container.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy() {
    this.container.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    init() {
      // 默认容器对象为 document
      this.container = document
      // 默认的根节点对象
      this.el = document.documentElement

      // 判断容器对象是否设置
      if (this.target) {
        this.el = document.querySelector(this.target)
        if (!this.el) {
          throw new Error('target 设置无效')
        }
        this.container = this.el
      }
    },
    // 点击回到顶部
    onClick(e) {
      this.onScrollToTop()
      this.$emit('click', e)
    },
    // 回到顶部实现动画效果
    onScrollToTop() {
      const el = this.el
      const beginTime = Date.now()
      // 距离上面的距离
      const scrollTop = el.scrollTop
      // 求某一个值三次方后的值
      const cubic = value => Math.pow(value, 3)
      const easeInOutCubic = value => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2
      // 动画函数
      const animate = window.requestAnimationFrame || (func => setTimeout(func, 16))
      // 不是很明白这段代码的动画，需要在琢磨琢磨 TODO
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500
        if (progress < 1) {
          el.scrollTop = scrollTop * (1 - easeInOutCubic(progress))
          animate(frameFunc)
        } else {
          el.scrollTop = 0
        }
      }

      // 执行动画
      animate(frameFunc)
    },
    // 判断滚动的距离
    onScroll() {
      const scrollTop = this.el.scrollTop
      // 当滚动的距离超过设置的值 visibilityHeight ，则显示按钮
      this.visible = scrollTop >= this.visibilityHeight
    }
  }
}
</script>