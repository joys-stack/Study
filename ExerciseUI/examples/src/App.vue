<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <h1>Button 按钮</h1>
    <div>
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
        <ex-button
          plain
          round
        >圆角按钮</ex-button>
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
          icon="edit"
          type="primary"
          circle
        ></ex-button>
        <ex-button
          icon="check"
          type="success"
          circle
        ></ex-button>
        <ex-button
          icon="message"
          type="info"
          circle
        ></ex-button>
        <ex-button
          icon="star-off"
          type="warning"
          circle
        ></ex-button>
        <ex-button
          icon="delete"
          type="danger"
          circle
        ></ex-button>
      </ex-row>

      <ex-row>
        <ex-button disabled>默认按钮</ex-button>
        <ex-button
          type="primary"
          disabled
        >主要按钮</ex-button>
        <ex-button
          type="success"
          disabled
        >成功按钮</ex-button>
        <ex-button
          type="info"
          disabled
        >信息按钮</ex-button>
        <ex-button
          type="warning"
          disabled
        >警告按钮</ex-button>
        <ex-button
          type="danger"
          disabled
        >危险按钮</ex-button>
      </ex-row>

      <ex-row>
        <ex-button
          type="primary"
          size="large"
        >大号按钮</ex-button>
        <ex-button
          type="primary"
          size="medium"
        >中号按钮</ex-button>
        <ex-button
          type="primary"
          size="small"
        >小号按钮</ex-button>
      </ex-row>

      <ex-row>
        <ex-button
          type="primary"
          loading
        >加载按钮</ex-button>
      </ex-row>

      <ex-row>
        <ex-button type="text">文字按钮</ex-button>
        <ex-button
          type="text"
          disabled
        >文字按钮</ex-button>
      </ex-row>

      <ex-row :gutter="8">
        <ex-col :span="4">
          <ex-button-group>
            <ex-button type="primary">上一页</ex-button>
            <ex-button type="primary">下一页</ex-button>
          </ex-button-group>
        </ex-col>
        <ex-col :span="4">
          <ex-button-group>
            <ex-button
              type="primary"
              icon="edit"
            ></ex-button>
            <ex-button
              type="primary"
              icon="share"
            ></ex-button>
            <ex-button
              type="primary"
              icon="delete"
            ></ex-button>
          </ex-button-group>
        </ex-col>
      </ex-row>
    </div>
    <hr>
    <h1>Layout</h1>
    <div>
      <ex-row :gutter="16">
        <ex-col :span="6">
          <div style="height: 40px;background-color: #ddd;"></div>
        </ex-col>
        <ex-col :span="6">
          <div style="height: 40px;background-color: #ddd;"></div>
        </ex-col>
        <ex-col :span="6">
          <div style="height: 40px;background-color: #ddd;"></div>
        </ex-col>
        <ex-col :span="6">
          <div style="height: 40px;background-color: #ddd;"></div>
        </ex-col>
      </ex-row>
    </div>
    <hr>
    <h1>Alert</h1>
    <div>
      <ex-row>
        <ex-alert
          type="info"
          title="消息提示文案"
        ></ex-alert>
        <ex-alert
          type="success"
          title="成功提示文案"
        ></ex-alert>
        <ex-alert
          type="warning"
          title="警告提示文案"
        ></ex-alert>
        <ex-alert
          type="error"
          title="错误提示文案"
        ></ex-alert>
      </ex-row>
      <ex-row>
        <ex-alert
          type="info"
          title="消息提示文案"
          effect="dark"
        ></ex-alert>
        <ex-alert
          type="success"
          title="成功提示文案"
          effect="dark"
        ></ex-alert>
        <ex-alert
          type="warning"
          title="警告提示文案"
          effect="dark"
        ></ex-alert>
        <ex-alert
          type="error"
          title="错误提示文案"
          effect="dark"
        ></ex-alert>
      </ex-row>
      <ex-row>
        <ex-alert
          type="success"
          title="不可关闭"
          effect="dark"
          :closable="false"
        ></ex-alert>
        <ex-alert
          type="success"
          title="自定义关闭内容"
          effect="dark"
          closeText="知道了"
        ></ex-alert>
      </ex-row>
      <ex-row>
        <ex-alert
          type="info"
          title="消息提示文案"
          effect="light"
          showIcon
          center
        ></ex-alert>
        <ex-alert
          type="success"
          title="成功提示文案"
          effect="light"
          showIcon
          center
        ></ex-alert>
        <ex-alert
          type="warning"
          title="警告提示文案"
          effect="light"
          showIcon
          center
        ></ex-alert>
        <ex-alert
          type="error"
          title="错误提示文案"
          effect="light"
          showIcon
          center
        ></ex-alert>
      </ex-row>
      <ex-row>
        <ex-alert
          type="info"
          title="提示"
          effect="light"
          showIcon
        >信息</ex-alert>
        <ex-alert
          type="success"
          title="提示"
          effect="light"
          showIcon
        >成功</ex-alert>
        <ex-alert
          type="warning"
          title="提示"
          effect="light"
          showIcon
        >警告</ex-alert>
        <ex-alert
          type="error"
          title="提示"
          effect="light"
          showIcon
        >错误</ex-alert>
      </ex-row>
      <ex-row>
        <ex-alert
          type="info"
          title="提示"
          description="测试描述内容2"
          effect="light"
          showIcon
        >
          <!-- <p slor="default"></p> -->
          <span slot="title">插槽Title</span>
          测试描述内容
        </ex-alert>
      </ex-row>
    </div>
    <hr>
    <h1>avatar</h1>
    <div>
      <ex-row>
        <ex-avatar
          size="large"
          :src="url"
          shape="circle"
        ></ex-avatar>
        <ex-avatar
          size="medium"
          :src="url"
          shape="circle"
        ></ex-avatar>
        <ex-avatar
          size="small"
          :src="url"
          shape="circle"
        ></ex-avatar>
        <ex-avatar
          size="large"
          :src="url"
          shape="square"
        ></ex-avatar>
        <ex-avatar
          size="medium"
          :src="url"
          shape="square"
        ></ex-avatar>
        <ex-avatar
          size="small"
          :src="url"
          shape="square"
        ></ex-avatar>
      </ex-row>
      <ex-row>
        <ex-avatar icon="user-solid"></ex-avatar>
        <ex-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></ex-avatar>
        <ex-avatar>王磊</ex-avatar>
      </ex-row>
      <ex-row>
        <ex-avatar
          shape="square"
          :size="100"
          object-fit="fit"
          :src="url2"
        ></ex-avatar>
        <ex-avatar
          shape="square"
          :size="100"
          object-fit="contain"
          :src="url2"
        ></ex-avatar>
        <ex-avatar
          shape="square"
          :size="100"
          object-fit="cover"
          :src="url2"
        ></ex-avatar>
        <ex-avatar
          shape="square"
          :size="100"
          object-fit="none"
          :src="url2"
        ></ex-avatar>
        <ex-avatar
          shape="square"
          :size="100"
          object-fit="scale-down"
          :src="url2"
        ></ex-avatar>
      </ex-row>
    </div>
    <hr>
    <h1>Badge</h1>
    <div>
      <ex-row>
        <ex-badge
          :value="count"
          type="primary"
        >
          <ex-button size="small">消息</ex-button>
        </ex-badge>
        <ex-badge
          :value="90"
          type="info"
        >
          <ex-button size="small">消息</ex-button>
        </ex-badge>
        <ex-badge
          :value="90"
          type="warning"
        >
          <ex-button size="small">消息</ex-button>
        </ex-badge>
        <ex-badge
          :value="90"
          type="success"
        >
          <ex-button size="small">消息</ex-button>
        </ex-badge>
        <ex-badge
          :value="90"
          type="danger"
        >
          <ex-button size="small">消息</ex-button>
        </ex-badge>
      </ex-row>
      <ex-row>
        <ex-badge :value="100" :max="99">
          <ex-button size="small">消息</ex-button>
        </ex-badge>
        <ex-badge :value="20" :max="10">
          <ex-button size="small">消息</ex-button>
        </ex-badge>
      </ex-row>
      <ex-row>
        <ex-badge value="new">
          <ex-button size="small">评论</ex-button>
        </ex-badge>
        <ex-badge value="hot">
          <ex-button size="small">回复</ex-button>
        </ex-badge>
        <ex-badge value="hot" is-dot>
          数据
        </ex-badge>
        <ex-badge is-dot>
          <ex-button type="primary">消息</ex-button>
        </ex-badge>
        <ex-badge is-dot hidden>
          <ex-button type="primary">消息</ex-button>
        </ex-badge>
      </ex-row>
    </div>
    <ex-backtop
      target="#app"
      :visibilityHeight="50"
    ></ex-backtop>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      count: 0,
      url: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      url2: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>

<style>
.ex-row {
  margin-bottom: 20px;
}

#app > div:not([class^="ex-backtop"]) {
  padding-left: 20px;
}

#app > h1 {
  margin-bottom: 8px;
  padding-left: 20px;
}

.ex-avatar {
  margin-right: 8px;
}

.ex-badge{
  margin-right: 36px;
}
</style>
