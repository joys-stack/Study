<script>
export default {
  name: 'ExAvatar',
  props: {
    // 大小
    size: {
      type: [String, Number],
      validator: value => {
        // 如果是字符串，则只有三个型号
        if (typeof value === 'string') {
          return ['large', 'medium', 'small'].includes(value)
        }
        return typeof value === 'number'
      }
    },
    // 图标
    icon: String,
    // 形状(只能是圆形或者方形)
    shape: {
      type: String,
      default: 'circle',
      validator: value => {
        return ['circle', 'square'].includes(value)
      }
    },
    // 图片源路径
    src: String,
    srcSet: String,
    alt: String,
    objectFit: {
      type: String,
      default: 'cover'
    },
    error: Function
  },
  data() {
    return {
      imgExit: true
    }
  },
  computed: {
    avatarClass() {
      const classArr = ['ex-avatar']
      // 大小
      if (this.size) {
        classArr.push('ex-avatar--' + this.size)
      }

      // 是否是 icon
      if (this.icon) {
        classArr.push('ex-avatar--icon')
      }

      // 形状
      if (this.shape) {
        classArr.push('ex-avatar--' + this.shape)
      }

      return classArr.join(' ')
    }
  },
  methods: {
    handleError() {
      const errorFlag = error ? this.error() : undefined
      if (errorFlag !== false) {
        this.imgExit = false
      }
    },
    renderAvatar() {
      // 如果img是存在的，则使用img进行显示
      if (this.imgExit && this.src) {
        return (<img src={this.src}
          srcset={this.srcSet}
          alt={this.alt}
          onError={this.handleError}
          style={{ 'object-fit': this.objectFit }}
        />)
      }

      const _ico = 'ex-icon-'
      if (this.icon) {
        return (<i class={_ico + this.icon}></i>)
      }

      return this.$slots.default
    }
  },
  render() {
    const sizeStyle = typeof this.size === 'number' ? {
      height: (this.size + 'px'),
      width: (this.size + 'px'),
      lineHeight: (this.size + 'px')
    } : {}

    return (<span class={this.avatarClass} style={sizeStyle}>
      {this.renderAvatar()}
    </span>)
  }
}
</script>