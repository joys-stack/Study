<template>
  <div>
    <Header ref="HeaderRef"></Header>
    <video ref="VideoRef"></video>
  </div>
</template>
<script>
import Header from "./Header.vue";
const peer = require("../main/peer-control");
export default {
  name: "Control",
  components: {
    Header,
  },
  mounted() {
    this.InitToolBar();
    peer.on("add-stream", (stream) => {
      this.play(stream);
    });
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("mouseup", this, this.onMouseUp);
  },
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
          name: "Close",
          ico: "close",
          title: "关闭",
        },
      ]);
    },
    // 播放
    play(stream) {
      const video = this.$refs.VideoRef;
      video.srcObject = stream;
      video.onloadedmetadata = function () {
        video.play();
      };
    },
    onKeyDown(e) {
      let data = {
        keyCode: e.keyCode,
        shift: e.shiftKey,
        meta: e.metaKey,
        control: e.ctrlKey,
        alt: e.altKey,
      };
      peer.emit("robot", "key", data);
    },
    onMouseUp(e) {
      let data = {
        clientX: e.clientX,
        clientY: e.clientY,
        vide: {
          width: this.$refs.VideoRef.getBoundingClientRect().width,
          height: this.$refs.VideoRef.getBoundingClientRect().height,
        },
      };
      peer.emit("robot", "mouse", data);
    },
  },
};
</script>
<style lang="css" scoped>
</style>