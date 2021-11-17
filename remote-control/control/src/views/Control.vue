<template>
  <div
    class="control"
    ref="ControlRef"
  >
    <Header ref="HeaderRef"></Header>
    <video
      ref="VideoRef"
      style="width:100%;height:100%;object-fit:fill;"
    ></video>
  </div>
</template>
<script>
import Header from "./Header.vue";
const { peer } = require("../main/utils/peer-control");
export default {
  name: "Control",
  components: {
    Header,
  },
  mounted() {
    this.InitToolBar();
    // 开始创建offer
    peer.create()

    peer.on("add-stream", (stream) => {
      this.play(stream);
    });
    this.$nextTick(() => {
      // this.$refs.ControlRef.addEventListener("keydown", this.onKeyDown);
      window.addEventListener("keydown", this.onKeyDown)
      this.$refs.ControlRef.addEventListener("mouseup", this.onMouseUp);
    })
    /* ;
    window.addEventListener("mouseup", this.onMouseUp); */
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
        ctrl: e.ctrlKey,
        alt: e.altKey,
      };
      peer.emit("robot", "key", data);
    },
    onMouseUp(e) {
      let button = 'left'
      const mouseType = e.button + 1 || e.which
      if (mouseType == 1) {
        button = 'left';
      } else if (mouseType == 2) {
        button = 'middle';
      } else if (mouseType == 3) {
        button = 'right';
      }
      const videoRef = this.$refs.VideoRef
      let data = {
        clientX: e.clientX,
        clientY: e.clientY,
        video: {
          width: videoRef.getBoundingClientRect().width,
          height: videoRef.getBoundingClientRect().height,
        },
        button
      };
      peer.emit("robot", "mouse", data);
    },
  },
};
</script>
<style lang="css" scoped>
.control {
  /* margin: 5px; */
  -webkit-box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 5px;
  -moz-box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 5px;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 5px;
}
</style>