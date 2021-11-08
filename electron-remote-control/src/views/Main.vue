<template>
  <div>
    <Header ref="HeaderRef"></Header>
    <div v-if="controlText === ''">
      <p>你的控制码是：{{ localCode }}</p>
      <input
        type="text"
        v-model="remoteCode"
        @change="setRemoteCode($event)"
      />
      <button @click="startControl(remoteCode)">确认</button>
    </div>
    <div v-else>{{ controlText }}</div>
  </div>
</template>

<script>
import Header from './Header.vue'
const { ipcRenderer } = window.require("electron");
export default {
  name: "Main",
  components: {
    Header
  },
  data() {
    return {
      remoteCode: "",
      localCode: "",
      controlText: "",
      setControlText: "",
    };
  },
  mounted() {
    // 初始化 ToolBar
    this.InitToolBar()

    this.$nextTick(async () => {
      // 登陆
      let code = await ipcRenderer.invoke("IPCLogin");
      this.setLocalCode(code);
    });

    // 监听控制状态
    ipcRenderer.on("control-state-change", this.handleControlState);
  },
  beforeUnmount() {
    ipcRenderer.removeListener("control-state-change", this.handleControlState);
  },
  methods: {
    // 初始化 ToolBar
    InitToolBar() {
      this.$refs.HeaderRef.RegisterToolbar([{
        name: 'Min',
        ico: 'minus',
        title: '最小化'
      }, {
        name: 'Max',
        ico: 'maximize',
        title: '最大化'
      }, {
        name: 'Close',
        ico: 'close',
        title: '关闭'
      }])
    },
    setLocalCode(value) {
      this.localCode = value;
    },
    setRemoteCode(e) {
      this.remoteCode = e.target.value
    },
    handleControlState(e, name, type) {
      let text = "";
      if (type === "1") {
        text = `正在远程控制${name}`;
      } else if (type === "2") {
        text = `被${name}控制中`;
      }
      this.controlText = text;
    },
    startControl(value) {
      ipcRenderer.send("IPCRemoteControl", value);
    },
  },
};
</script>

<style>
</style>
