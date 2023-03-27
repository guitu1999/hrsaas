// 专门处理权限路由的模块
// 引入静态路由
import { constantRoutes } from '@/router'
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

}
export default {
  namespaced: true, // 命名空间
  state,
  mutations,
  actions
}
