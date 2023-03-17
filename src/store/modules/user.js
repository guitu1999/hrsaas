import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { login } from '@/api/user'
const state = {
  // 每次登录先从缓存中读取token
  token: getToken() || null // 登录的etoken
}
// 同步方法
const mutations = {
  // 修改token
  SetToken(state, token) {
    state.token = token // 同步到vuex
    setToken(token) // 同步到缓存
  },
  // 删除token
  removeToken(state) {
    state.token = '' // 清空vuex
    removeToken() // 清空缓存
  }
}
// 异步方法
const actions = {
  // 登录方法
  async loginAsync(context, data) {
    // 调用登录接口
    const result = await login(data)
    console.log('登录接口请求成功', result)
    context.commit('SetToken', result) // 调用同步更改token方法
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
