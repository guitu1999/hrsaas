// 权限拦截在路由跳转 导航守卫
import router from '@/router' // 路由
import store from '@/store/index.js' // 引入store实例==组件中this.$store

import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404'] // 定义白名单

// 前置守卫   next必须执行
// next(false) 跳转终止
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条
  // 有token
  if (store.getters.token) {
    // 访问登录页
    if (to.path === '/login') {
      // 跳转到主页
      next('/')
    } else {
      // 没有放行
      // 判断是否有用户id
      if (!store.getters.userId) {
        // 没有 ==> 请求获取用户信息异步方法

        // user/getUserInfoAsync 这里返回了一个结果
        const { roles } = await store.dispatch('user/getUserInfoAsync')
        // 需要改成同步方法 加await async
        // 获取资料完毕后  再去放行

        // 筛选用户的可用路由
        // permission/filterRoutes 也返回了一个筛选得到的可用路由表
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        console.log('打印这个routes', routes)

        // 把这个动态路由 添加到 路由表中
        // addRoutes  添加动态路由到路由表  必须使用next(to.path)
        router.addRoutes(routes)
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    // 没有token

    if (whiteList.indexOf(to.path) > -1) {
      // 在白名单
      next()
    } else {
      // 不在白名单
      next('/login')
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(() => {
  NProgress.done()// 关闭进度条
})
