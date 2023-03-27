// 专门处理权限路由的模块
// 引入静态路由 constantRoutes
// 引入动态路由 asyncRoutes
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes // 默认静态路由
}
const mutations = {
  // newRoutes为用户登录后获得的新的路由权限
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 等于默认路由 + 新路由
  }
}
const actions = {
  // 筛选路由
  filterRoutes(context, menus) {
    // menus是当前用户的路由权限列表
    const newRoles = []
    menus.forEach(key => {
      // asyncRoutes 所有的动态路由表
      newRoles.push(...asyncRoutes.filter(obj => obj.name === key))
    })
    // newRoles  为当前用户满足权限的路由
    context.commit('setRoutes', newRoles) // 将动态路由提交给mutations
    return newRoles // 这里为什么还要return  state数据 是用来 显示左侧菜单用的  return  是给路由addRoutes用的
  }
}
export default {
  namespaced: true, // 命名空间
  state,
  mutations,
  actions
}
