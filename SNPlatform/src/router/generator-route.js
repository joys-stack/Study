import Vue from 'vue'

// 基础路由
const constRoutes = {
  path: '/Home',
  redirect: '/Desktop'
}

// 用户权限路由
const userRoutes = {
  path: '/Home',
  name: 'Home',
  component: () => import( /* webpackChunkName: "Home" */ '@/views/home/Home.vue'),
  children: [{
    name: 'Desktop',
    path: '/Desktop',
    component: () => import( /* webpackChunkName: "Home" */ '@/views/home/Desktop.vue'),
    meta: {
      tag: []
    }
  }]
}

// 生成后的主要权限
const routes = [constRoutes, userRoutes]

// 生成权限的函数
export const generator = () => {
  return new Promise((resolve, reject) => {
    // 请求获取权限
    Vue.prototype.post('public/menulist', {}).then(result => {
      if (result.code === 200) {
        const routesData = result.data || []

        const tree = []
        listToTree(routesData, tree, 0)
        // 根据树结果生成路由
        treeToRoutes(tree, userRoutes.children, [])

        resolve({
          MainRoute: routes,
          AddRoutes: userRoutes.children,
          TreeRoutes: tree
        })
      }
    }).catch(error => {
      reject(error)
    })
  })
}

// 根据树生成路由
const treeToRoutes = (tree, route, tags) => {
  tree.forEach(item => {
    const level = []
    level.push(...tags)
    level.push(item.MenuSName)

    if (item.FunctionID > 0) {
      route.push({
        name: item.RoutePath.replace(/\//, ''),
        path: item.RoutePath,
        component: () => import( /* webpackChunkName: "user-route" */ ('@/views/' + item.DirPath + item.RoutePath + '.vue')),
        meta: {
          tag: level,
          title: item.MenuSName
        }
      })
    } else if (item.children && item.children.length > 0) {
      treeToRoutes(item.children, route, level)
    }
  })
}

// 数据列表生成树
const listToTree = (list, tree, pid) => {
  const li = list.filter(item => item.PMenuID === pid)

  if (li.length === 0) return

  const children = []
  // 获取主菜单
  li.forEach(item => {
    const child = {
      ...item,
      children
    }
    listToTree(list, child.children, item.MenuID)
    tree.push(child)
  })
}
