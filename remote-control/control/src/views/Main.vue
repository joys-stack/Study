<template>
  <div class="main">
    <Header ref="HeaderRef"></Header>
    <div class="control">
      <ul>
        <li
          v-for="(item, index) in Clients"
          :key="index"
          @click="startControl($event, item)"
        >
          <img src="../assets/computer.png" />
          <span>{{ item.ClientIP }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
const { ipcRenderer } = window.require("electron");
export default {
  name: "Main",
  components: {
    Header,
  },
  data() {
    return {
      Clients: [{ ClientIP: "127.0.0.1" }, { ClientIP: "192.168.5.15" }],
    };
  },
  mounted() {
    // 初始化 ToolBar
    this.InitToolBar();

    ipcRenderer.on("connection-success", this.handleSuccess);
  },
  beforeUnmount() {},
  methods: {
    // 初始化 ToolBar
    InitToolBar() {
      this.$refs.HeaderRef.RegisterToolbar([
        {
          name: "Min",
          ico: "minus",
          title: "最小化",
        },
        {
          name: "Max",
          ico: "maximize",
          title: "最大化",
        },
        {
          name: "Close",
          ico: "close",
          title: "关闭",
        },
      ]);
    },
    // 连接成功
    handleSuccess() {
      // this.Clients = data;
    },
    // 开始远程
    startControl() {
      ipcRenderer.send("IPCRemoteControl", { ClientIP: "127.0.0.1", Model: 'puppet' });
    },
  },
};
</script>

<style lang="css" scoped>
.control ul {
  padding: 8px;
  display: flex;
}

.control ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  padding: 16px;
  margin: 0 4px;
  border: 1px solid #f5f5f5;
  cursor: pointer;
}

.control ul li img {
  height: 50px;
  width: 50px;
}

.control ul li span {
  padding: 8px 0;
  font-size: 14px;
}
</style>
