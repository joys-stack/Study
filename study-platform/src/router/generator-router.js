import {
  postUserMenuAuth
} from '@/api/public'

// 基础路由
const constRoutes = {
  path: '/home',
  redirect: '/index'
}

// 用户权限路由
const userRoutes = {
  path: '/home',
  component: () => import( /* webpackChunkName: "group-home" */ '@/views/home/home.vue'),
  children: [{
    path: '/index',
    name: 'index',
    component: () => import( /* webpackChunkName: "group-index" */ '@/views/dashborad/index.vue')
  }]
}

const mainRouter = [constRoutes, userRoutes]

/**
 * 动态生成菜单
 * @param param
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (param) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // 定义返回的内容
    // 构建菜单栏树
    const trees = []
    // 生成功能点路由
    const mainRouterChildrens = []
    const rutes = {
      addRoutes: mainRouterChildrens,
      mainRouter: mainRouter,
      menuTrees: trees
    }

    const result = await postUserMenuAuth(window.config.PublicUrl, param)
    if (result && result.code === 1) {
      listToTree(result.response, trees, 0)
      generator(trees, mainRouterChildrens)
      userRoutes.children.push(...mainRouterChildrens)
    }
    resolve(rutes)
  })
}

/**
 * 生成功能点路由
 * @param {Array} trees 菜单栏树
 * @param {Array} routers 返回的路由数组
 * @param {Array} tags 功能点面包屑数组
 */
const generator = (trees, routers, tags) => {
  trees.forEach(item => {
    const level = []
    if (tags) {
      level.push(...tags)
    }

    // 判断level中是否已添加组名称
    const index = level.findIndex(e => e === item.menuGroupName)
    if (index < 0 && item.menuGroupName !== '') {
      level.push(item.menuGroupName)
    }
    level.push(item.menuShortName)
    if (item.functionID > 0) {
      routers.push({
        path: item.objectName,
        name: item.objectName.substr(1),
        component: () => import( /* webpackChunkName: "group-router" */ ('@/views/' + item.fileName + item.objectName + '.vue')),
        // meta
        meta: {
          title: item.menuShortName
        },
        tag: level
      })
    }

    if (item.children && item.children.length > 0) {
      generator(item.children, routers, level)
    }
  })
  return routers
}

/*
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树数组
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  // 获取菜单
  const li = list.filter(it => {
    return it.parentMenuID === parentId
  })

  if (li.length === 0) {
    return
  }
  li.forEach(item => {
    const child = {
      ...item,
      children: []
    }

    // 迭代
    listToTree(list, child.children, item.menuID)
    tree.push(child)
  })
}
