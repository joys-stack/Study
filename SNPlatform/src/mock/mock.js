const Mock = require('mockjs')

// 菜单权限
Mock.mock('/api/public/menulist', {
  code: 200,
  error: '',
  data: [{
    MenuID: 100,
    PMenuID: 0,
    FunctionID: 0,
    MenuName: '查询统计',
    MenuSName: '查询统计',
    MenuPic: 'setting',
    DirPath: '',
    RoutePath: ''
  }, {
    MenuID: 101,
    PMenuID: 100,
    FunctionID: 100,
    MenuName: '招募查询',
    MenuSName: '招募查询',
    MenuPic: '',
    DirPath: 'test',
    RoutePath: '/AA'
  }, {
    MenuID: 102,
    PMenuID: 100,
    FunctionID: 101,
    MenuName: '全血查询',
    MenuSName: '全血查询',
    MenuPic: '',
    DirPath: 'test',
    RoutePath: '/BB'
  }]
})
