const Mock = require('mockjs')

Mock.mock('/api/public/login', {
  code: 200,
  error: '',
  data: {
    UseID: 102,
    UserName: 'Joy'
  }
})

export default Mock
