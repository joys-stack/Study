<template>
  <div class="common">
    <div class="header"></div>
    <div class="container">
      <div class="aside">
        <ul class="menu">
          <!-- 无子菜单 -->
          <li
            class="menu-item"
            v-for="item in MenuList.filter(ob=> ob.children.length === 0)"
            :key="item.funID"
            @click="onFuncClick(item.funcID)"
          >
            <router-link :to="item.path">{{item.name}}</router-link>
          </li>
          <!-- 有子菜单 -->
          <li
            class="sub-menu"
            v-for="item in MenuList.filter(ob=> ob.children.length > 0)"
            :key="item.menuID"
          >
            <div
              class="title"
              @click.stop="onSubMenuClick(item.menuID)"
            >
              <span>{{item.name}}</span>
              <ex-icon
                type="caret-bottom"
                :class="['icon', subActive.includes(item.menuID)?'icon-active':'']"
              ></ex-icon>
            </div>
            <ul
              :class="[subActive.includes(item.menuID)?'':'sub-hidden']"
              :style="{ height: item.children.length * 40 + 'px' }"
            >
              <li
                :class="['menu-item', it.funID === itemActive? 'menu-item-active' : '']"
                v-for="it in item.children"
                :key="it.funID"
                @click="onFuncClick(it.funID)"
              >
                <router-link :to="it.path">{{it.name}}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="main">
        <div class="main-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subActive: [],
      itemActive: 0,
      open: false,
      MenuList: [{
        menuID: 100,
        funID: 100,
        path: '/home',
        name: '快速开始',
        children: []
      }, {
        menuID: 101,
        funID: 0,
        path: '',
        name: '页面布局',
        children: [{
          funID: 101,
          path: '/button',
          name: 'Button 按钮',
        }, {
          funID: 103,
          path: '/button',
          name: 'Button 按钮',
        }, {
          funID: 104,
          path: '/button',
          name: 'Button 按钮',
        }]
      }, {
        menuID: 102,
        funID: 0,
        path: '/home',
        name: '基础组件',
        children: [{
          funID: 102,
          path: '/button',
          name: 'button',
        }]
      }]
    }
  },
  methods: {
    onFuncClick(id) {
      this.itemActive = id
    },
    onSubMenuClick(id) {
      // 如果存在就移除
      const index = this.subActive.findIndex(item => item === id)
      if (index >= 0) {
        this.subActive.splice(index, 1)
      } else {
        this.subActive.push(id)
      }
    }
  }
}
</script>
<style lang="css">
.common {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.common .header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%);
}

.common .container {
  margin-top: 64px;
  flex: 1;
  display: flex;
  flex-direction: row;
}

.common .container .aside {
  width: 250px;
  height: 100%;
  border-right: 1px solid #eee;
}

.common .container .main {
  padding: 24px;
  flex: 1;
}

.container .menu {
  height: 100%;
}

.aside .menu-item {
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  text-overflow: ellipsis;
  color: #252b3a;
  font-size: 12px;
}

.sub-menu .menu-item {
  padding-left: 40px;
  position: relative;
}

.sub-menu .menu-item::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 40px;
  background-color: #dfe1e6;
  left: 28px;
  vertical-align: middle;
}

.sub-menu .menu-item:first-child::before {
  bottom: 0;
}

.sub-menu .menu-item:last-child::before {
  top: 0;
}

.sub-menu .menu-item:first-child::before,
.sub-menu .menu-item:last-child::before {
  height: 28px;
}

.menu-item,
.title {
  cursor: pointer;
}

.sub-menu .menu-item::after {
  content: "";
  position: absolute;
  width: 2px;
  height: 0px;
  left: 28px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #526ecc;
  transition: all 0.3s ease;
}

.menu-item-active a {
  color: #526ecc !important;
  font-weight: 600 !important;
}

.menu-item-active::after {
  height: 20px !important;
}

.aside ul li.menu-item:hover,
.sub-menu .title:hover {
  background-color: #f2f5fc;
}

.aside ul li a {
  color: #252b3a;
}

.sub-menu .title {
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
}

.title span {
  color: #575d6c;
  font-weight: 600;
}

.icon {
  line-height: 40px;
  font-size: 14px;
  margin-right: 10px;
  transition: all 0.4s;
}

.icon-active {
  transform: rotate(180deg);
}

.sub-menu > ul{
  transition: all .2s linear;
}

.sub-menu .sub-hidden {
  overflow: hidden;
  height: 0 !important;
  opacity: 0;
}

.main-container {
  padding-left: 248px;
}
</style>