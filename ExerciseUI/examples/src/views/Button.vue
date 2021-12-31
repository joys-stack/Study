<template>
  <div>
    <base-component>
      <span slot="title">基础用法</span>
      <div slot="view">
        <div ref="viewRef">
          <ex-row>
            <ex-button>默认按钮</ex-button>
            <ex-button type="primary">主要按钮</ex-button>
            <ex-button type="success">成功按钮</ex-button>
            <ex-button type="info">信息按钮</ex-button>
            <ex-button type="warning">警告按钮</ex-button>
            <ex-button type="danger">危险按钮</ex-button>
          </ex-row>
          <ex-row>
            <ex-button plain>朴素按钮</ex-button>
            <ex-button
              type="primary"
              plain
            >主要按钮</ex-button>
            <ex-button
              type="success"
              plain
            >成功按钮</ex-button>
            <ex-button
              type="info"
              plain
            >信息按钮</ex-button>
            <ex-button
              type="warning"
              plain
            >警告按钮</ex-button>
            <ex-button
              type="danger"
              plain
            >危险按钮</ex-button>
          </ex-row>

          <ex-row>
            <ex-button round>圆角按钮</ex-button>
            <ex-button
              type="primary"
              round
            >主要按钮</ex-button>
            <ex-button
              type="success"
              round
            >成功按钮</ex-button>
            <ex-button
              type="info"
              round
            >信息按钮</ex-button>
            <ex-button
              type="warning"
              round
            >警告按钮</ex-button>
            <ex-button
              type="danger"
              round
            >危险按钮</ex-button>
          </ex-row>

          <ex-row>
            <ex-button
              icon="search"
              circle
            ></ex-button>
            <ex-button
              type="primary"
              icon="edit"
              circle
            ></ex-button>
            <ex-button
              type="success"
              icon="check"
              circle
            ></ex-button>
            <ex-button
              type="info"
              icon="message"
              circle
            ></ex-button>
            <ex-button
              type="warning"
              icon="star-off"
              circle
            ></ex-button>
            <ex-button
              type="danger"
              icon="delete"
              circle
            ></ex-button>
          </ex-row>
        </div>
      </div>
      <template slot="code">
        {{$refs.viewRef.innerHTML}}
      </template>
    </base-component>
  </div>
</template>
<script>
import BaseComponent from '../components/Component.vue'
export default {
  name: 'Button',
  components: {
    BaseComponent
  },
  data() {
    return {
      code: 'var a=5;'
    }
  },
  mounted() {
    console.log(this.$refs.viewRef)
  }
}
</script>