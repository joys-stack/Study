import Vue from 'vue'

// 数字格式化，每三个数字加一个逗号，并且如果是金额，前面加上钱的符号 formatType: 1 加上金钱符号  2 不加
Vue.filter('formatNumber', (val, formatType) => {
  let str = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if (formatType === '1') {
    str = '￥' + '  ' + str
  }
  return str
})

// 时间过滤器
Vue.filter('formatDate', (val, formatType) => {
  if (!val || val === '') return ''
  const dateStr = val.replace(/T/g, ' ').replace(/Z/, '')
  return new Date(dateStr).Format(formatType)
})

// 身份证号保密性
Vue.filter('CardIDHidden', (param, start, end) => {
  const rep = new RegExp('(\\w{' + start + '})\\w*(\\w{' + end + '})')
  // const rep2 = /(\w{10})\w*(\w{2})/
  return param.replace(rep, '$1******$2')
})
