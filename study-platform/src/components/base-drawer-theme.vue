<template>
  <div class="common">
    <a-drawer
      class="drawer"
      title="主题"
      placement="right"
      :width="width"
      :mask="false"
      :closable="true"
      :visible="visible"
      @close="onClose"
    >
      <!--页面侧边栏主题-->
      <div>
        <span class="title">菜单栏主题背景</span>
        <a-tooltip
          placement="top"
          v-for="(item,index) in setting['theme-menu']"
          :key="index"
          :title="item.title"
        >
          <base-check-img
            class="check-img"
            :src="item.img"
            :theme="item.theme"
            :check-theme="checkTheme"
            @checkChange="onThemeChange"
          ></base-check-img>
        </a-tooltip>
      </div>
      <!--页面主题色-->
      <div>
        <span class="title">主题色</span>
        <div class="theme-color">
          <a-tooltip
            placement="top"
            :title="item.title"
            v-for="(item,index) in setting['theme-color']"
            :key="index"
          >
            <a-tag
              :color="item.color"
              @click="onThemeColorChange(item.color)"
            >
              <a-icon
                type="check"
                v-if="checkColor===item.color"
              />
            </a-tag>
          </a-tooltip>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import setting from '../config/theme-setting'

import theme from '../themes/theme'
// 导入主题选择组件
import baseCheckImg from '../components/base-check-img'
import { mapState } from 'vuex'
export default {
  components: {
    baseCheckImg
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      setting,
      checkColor: '',
      checkTheme: ''
    }
  },
  computed: {
    ...mapState({
      theme: state => state.theme.theme
    })
  },
  mounted() {
    this.onThemeColorChange(this.theme['THEME_COLOR'])
    this.onThemeChange(this.theme['THEME_MENU'])
  },
  methods: {
    onClose() {
      this.$emit('close', false)
    },
    // 主题颜色改变
    onThemeColorChange(color) {
      theme.changeColor(color)
      this.checkColor = color
      this.$store.commit('SET_THEME_COLOR', color)
    },
    // 主题风格改变
    onThemeChange(value) {
      this.checkTheme = value
      this.$store.commit('SET_THEME_MENU', value)
    }
  }
}
</script>
<style lang="css" scoped>
.theme-color >>> .ant-tag {
  padding: 0;
  height: 25px;
  width: 25px;
  text-align: center;
  position: relative;
}

.theme-color >>> .ant-tag:hover {
  cursor: pointer;
}

.theme-color >>> .ant-tag .anticon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
}

.theme-color .custom-color {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: transparent;
  appearance: none;
  border: none;
}

.drawer >>> .ant-drawer-header {
  padding: 14px 24px;
}

.drawer >>> .ant-drawer-body {
  padding: 16px;
}

.title {
  display: block;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 600;
}

.check-img {
  display: inline-block;
  padding: 5px;
  margin-right: 10px;
}
</style>
