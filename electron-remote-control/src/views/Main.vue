<template>
  <div>
    <div v-if="controlText === ''">
      <p>你的控制码是：{{ localCode }}</p>
      <input type="text" v-model="remoteCode" @change="setRemoteCode($event)" />
      <button @click="startControl(remoteCode)">确认</button>
    </div>
    <div v-else>{{ controlText }}</div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  name: "Main",
  components: {},
  data() {
    return {
      remoteCode: "",
      localCode: "",
      controlText: "",
      setControlText: "",
    };
  },
  mounted() {
    this.$nextTick(async () => {
      // 登陆
      let code = await ipcRenderer.invoke("IPCLogin");
      this.setLocalCode(code);
    });

    // 坚挺控制状态
    ipcRenderer.on("control-state-change", this.handleControlState);
  },
  beforeUnmount() {
    ipcRenderer.removeListener("control-state-change", this.handleControlState);
  },
  methods: {
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
      ipcRenderer.send("control", value);
    },
  },
};
</script>

<style>
</style>
