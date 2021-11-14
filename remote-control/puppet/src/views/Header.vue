<!--***************
* Author: Joy
* CreateDate: 2021-11-05
* Description: 窗口头部
* Modfier:
* ModfierDate:
* ModfierDescription:
***************/-->
<template>
  <div class="header">
    <ul>
      <li class="header-ico"></li>
      <li class="header-title"></li>
      <li class="header-empty"></li>
      <li class="header-toolbar">
        <ul @click="onHandleClick($event)">
          <li
            v-for="(item, index) in ToolbarList"
            :key="index"
            :name="item.name"
            :title="item.title"
            :class="[item.name === 'Close'? 'header-hover':'', `icon-${item.name === 'Max'? (isMax ?`un${item.ico}`: item.ico): item.ico}`]"
          >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  name: 'header',
  data() {
    return {
      ToolbarList: [],
      isMax: false
    }
  },
  methods: {
    RegisterToolbar(ToolbarList = []) {
      this.ToolbarList = ToolbarList;
    },
    // 处理点击
    onHandleClick(e) {
      e.preventDefault();
      const target = e.target;
      const attr = target.getAttribute('name')
      if (attr === 'Max') {
        this.isMax = !this.isMax
      }
      ipcRenderer.send('IPCToolbar', attr)
    }
  }
}
</script>
<style lang="css" scoped>
.header {
  height: 34px;
  cursor: move;
  -webkit-app-region: drag;
  background-color: #fff;
}

.header ul {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header ul li {
  height: 100%;
}

.header-ico {
  width: 34px;
}

.header-title {
  width: 200px;
}

.header-empty {
  flex: 1;
}

.header-toolbar ul {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-toolbar ul li {
  height: 100%;
  cursor: pointer;
  -webkit-app-region: no-drag;
}

.header-toolbar ul li:hover {
  background-color: rgb(229, 229, 229);
}

.header-toolbar .header-hover:hover {
  background-color: rgb(232, 17, 35);
  color: #fff;
}

.header-toolbar ul li {
  display: inline-block;
  width: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 18px;
}
</style>