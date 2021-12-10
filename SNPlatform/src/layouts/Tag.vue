<template>
  <ul class="layout-tag">
    <li>
      <a-icon type="double-left" />
    </li>
    <li class="layout-tag-list">
      <ul>
        <li :class="[$route.path === '/Desktop'? 'tag-active': '']">
          <router-link to="/Desktop">
            <a-icon type="home" />
          </router-link>
        </li>
        <li
          v-for="(item, index) in TagList"
          :key="index"
          :class="[$route.path === item.path? 'tag-active': '']"
        >
          <router-link
            :to="item.path"
            class="tag-router"
          >
            <span>{{ item.name }}</span>
            <a-icon
              type="close"
              class="tag-router-close"
              @click.prevent.stop="onCloseTag(item.path)"
            />
          </router-link>
        </li>
      </ul>
    </li>
    <li>
      <a-icon type="double-right" />
    </li>
    <!-- 右键弹窗 -->
    <!--  <vue-context-menu
      :contextMenuData="contextMenuData"
      @home="home"
      @deletedata="deletedata"
    ></vue-context-menu> -->
  </ul>
</template>

<script>
export default {
  data() {
    return {
      TagList: [],
      // 菜单
      contextMenuData: {
        menuName: 'demo',
        // 菜单显示位置
        axis: {
          x: null,
          y: null
        },
        // 菜单选项
        menulists: [{
          fnHandler: 'on',
          btnName: '回到主页'
        }, {
          fnHandler: 'deletedata',
          btnName: '删除布局'
        }]
      }
    }
  },
  watch: {
    $route(n, o) {
      this.onSetTag(n)
    },
    TagList(n, o) {
      this.Emitter.$emit('event-tags', n)
    }
  },
  mounted() {
    this.onSetTag(this.$route)
  },
  methods: {
    // 设置标签
    onSetTag(route) {
      const index = this.TagList.findIndex(item => item.path === route.path)
      if (index < 0 && route.path !== '/Desktop') {
        this.TagList.push({
          name: route.meta.title,
          path: route.path
        })
      }
    },
    onCloseTag(path) {
      const index = this.TagList.findIndex(item => item.path === path)
      // 移除当前标签
      this.TagList.splice(index, 1)
      // 当前标签是否是激活的标签
      if (this.$route.path === path) {
        // 如果当前标签是最后一个，则跳转到首页
        if (index - 1 === -1) {
          this.$router.push({ path: '/Desktop' })
        } else {
          const route = this.TagList[index - 1]
          this.$router.push({ path: route.path })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@TagHeight: 38px;

.layout-tag {
  display: flex;
  height: @TagHeight;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  & > li:first-child,
  & > li:last-child {
    height: @TagHeight - 1;
    width: @TagHeight;
    text-align: center;
    line-height: @TagHeight - 1;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background-color: #f6f6f6;
    }
  }

  & > li:first-child {
    border-right: 1px solid #f6f6f6;
  }

  & > li:last-child {
    border-left: 1px solid #f6f6f6;
  }

  // 路由部分样式
  .layout-tag-list {
    flex: 1;

    ul > li {
      float: left;
      padding: 0 11px;
      line-height: @TagHeight - 2;
      position: relative;
      cursor: pointer;
      border-right: 1px solid #f6f6f6;

      &:hover {
        background-color: #f6f6f6;
      }

      &.tag-active {
        background-color: #f6f6f6;
        .tag-router {
          & /deep/ span {
            color: #000;
          }
        }

        &::before {
          content: "";
          position: absolute;
          top: -2px;
          left: 0;
          height: 2px;
          width: 100%;
          background: #000;
        }
      }

      .tag-router {
        display: inline-block;
        height: @TagHeight - 2;
        & /deep/ span {
          margin-right: 10px;
          color: #595959;
          font-size: 14px;
        }

        .tag-router-close {
          font-size: 12px;
          border-radius: 50%;
          padding: 2px;
          &:hover {
            color: #fff;
            background-color: rgb(255, 87, 36);
          }
        }
      }
    }
  }
}
</style>
