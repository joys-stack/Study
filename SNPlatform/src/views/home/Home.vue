<template>
  <a-layout class="a-layout">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      class="a-layout-sider"
      width="240"
    >
      <Sider></Sider>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="a-layout-header">
        <Header></Header>
        <Tag></Tag>
      </a-layout-header>
      <a-layout-content>
        <keep-alive :include="TagList">
          <router-view></router-view>
        </keep-alive>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from '@/layouts/Header.vue'
import Sider from '@/layouts/Sider.vue'
import Tag from '@/layouts/Tag.vue'

export default {
  components: {
    Header,
    Sider,
    Tag
  },
  data() {
    return {
      collapsed: false,
      TagList: []
    }
  },
  created() {
    // 加载本地session
    this.InitSession()
  },
  mounted() {
    this.InitOnEvent()
  },
  methods: {
    InitOnEvent() {
      // 监听菜单栏收缩
      this.Emitter.$on('event-collapse', e => {
        this.collapsed = e
      })

      // 监听标签页变化
      this.Emitter.$on('event-tags', list => {
        this.TagList = []
        this.TagList = list.map(item => {
          return item.path.replace(/\//, '')
        })
      })
    },
    InitSession() {
      Object.keys(sessionStorage).forEach(key => {
        this.$store.commit(`SET_${key}`, sessionStorage[key])
      })
    }
  }
}
</script>

<style lang="less" scoped>
.a-layout {
  height: 100%;

  .a-layout-sider {
    height: 100%;
  }

  .a-layout-header {
    height: 94px;
    padding: 0;
    background-color: transparent;
  }
}
</style>
