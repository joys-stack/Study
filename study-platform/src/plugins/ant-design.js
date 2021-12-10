import Vue from 'vue'
import {
  // 布局部分
  Layout,
  Row,
  Col,
  Card,
  Menu,
  // 表单部分
  Input,
  Select,
  FormModel,
  DatePicker,
  Radio,
  TimePicker,
  InputNumber,
  Checkbox,
  // 功能组件部分
  Table,
  Icon,
  Avatar,
  Dropdown,
  Tooltip,
  Progress,
  Badge,
  Timeline,
  Button,
  Modal,
  Breadcrumb,
  Tabs,
  Drawer,
  Pagination,
  ConfigProvider,
  Descriptions,
  Empty,
  Switch,
  Spin,
  Tag,
  Tree,
  TreeSelect,
  Divider,
  Collapse,
  Statistic,
  Comment,
  Steps,
  Upload,
  // 消息提示部分
  message,
  notification,
  Popover,
  Popconfirm
} from 'ant-design-vue'
import confirm from 'ant-design-vue/es/modal/confirm'

// 布局部分
Vue.use(Layout, {
  size: 'small',
  zIndex: 1
})
Vue.use(Row, {
  size: 'small',
  zIndex: 1
})
Vue.use(Col, {
  size: 'small',
  zIndex: 1
})
Vue.use(Card, {
  size: 'small',
  zIndex: 1
})
Vue.use(Menu, {
  size: 'small',
  zIndex: 1
})

// 表单部分
Vue.use(Input, {
  size: 'small',
  zIndex: 1
})
Vue.use(Select, {
  size: 'small',
  zIndex: 1
})
Vue.use(FormModel, {
  size: 'small',
  zIndex: 1
})
Vue.use(DatePicker, {
  size: 'small',
  zIndex: 1
})
Vue.use(Radio, {
  size: 'small',
  zIndex: 1
})
Vue.use(TimePicker, {
  size: 'small',
  zIndex: 1
})
Vue.use(InputNumber, {
  size: 'small',
  zIndex: 1
})
Vue.use(Checkbox, {
  size: 'small',
  zIndex: 1
})
// 功能组件部分
Vue.use(Table, {
  size: 'small',
  zIndex: 1
})
Vue.use(Icon, {
  size: 'small',
  zIndex: 1
})
Vue.use(Avatar, {
  size: 'small',
  zIndex: 1
})
Vue.use(Dropdown, {
  size: 'small',
  zIndex: 1
})
Vue.use(Tooltip, {
  size: 'small',
  zIndex: 1
})
Vue.use(Progress, {
  size: 'small',
  zIndex: 1
})
Vue.use(Badge, {
  size: 'small',
  zIndex: 1
})
Vue.use(Timeline, {
  size: 'small',
  zIndex: 1
})
Vue.use(Button, {
  size: 'small',
  zIndex: 1
})
Vue.use(Modal, {
  size: 'small',
  zIndex: 1
})
Vue.use(Breadcrumb, {
  size: 'small',
  zIndex: 1
})
Vue.use(Tabs, {
  size: 'small',
  zIndex: 1
})
Vue.use(Drawer, {
  size: 'small',
  zIndex: 1
})
Vue.use(Pagination, {
  size: 'small',
  zIndex: 1
})
Vue.use(ConfigProvider)
Vue.use(Descriptions, {
  size: 'small',
  zIndex: 1
})
Vue.use(Empty)
Vue.use(Switch, {
  size: 'small',
  zIndex: 1
})
Vue.use(Spin)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(TreeSelect)
Vue.use(Divider)
Vue.use(Collapse)
Vue.use(Statistic)
Vue.use(Comment)
Vue.use(Steps)
Vue.use(Upload)
Vue.use(Popover)
Vue.use(Popconfirm)

// 消息提示部分
Vue.component('message', message)
Vue.component('notification', notification)
Vue.prototype.$message = message
Vue.prototype.$confirm = confirm
Vue.prototype.$notification = notification
