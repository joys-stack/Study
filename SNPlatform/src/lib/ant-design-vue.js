import Vue from 'vue'
// 导入组件
import AntDesignVue from 'ant-design-vue'
// 导入样式
import 'ant-design-vue/dist/antd.css'

// 消息提示
const Message = AntDesignVue.message
Vue.use(AntDesignVue)
Vue.prototype.$message = Message
