<template>
  <div class="component">
    <div>
      <!-- 标题部分 -->
      <h2 class="component-title">
        <slot name="title"></slot>
      </h2>
      <!-- 用法视图 -->
      <div class="component-view">
        <slot name="view"></slot>
        <div
          class="component-event"
          @click.stop="open=!open"
        >
          <ex-icon :type="open? 'caret-top': 'caret-bottom'"></ex-icon>
        </div>
        <!-- 代码 -->
        <div
          class="component-code"
          v-if="open"
        >
          <pre v-highlight>
            <code class="html">
              <slot name="code"></slot>
            </code>
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>
<style lang="css" scoped>
.component-title {
  display: block;
  font-size: 16px;
  padding: 20px 0 20px 20px;
}

.component-view {
  padding: 20px 0 0 20px;
  width: 800px;
  border: 1px solid #f5f5f5;
}

.component-view .ex-row {
  margin-bottom: 20px;
}

.component-event {
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #f5f5f5;
  text-align: center;
  cursor: pointer;
  margin-left: -20px;
}

.component-event:hover {
  background-color: #f8f8f8;
}

.component-code {
  background-color: #f5f5f5;
  margin-left: -20px;
}
</style>