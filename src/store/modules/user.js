import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth.js'
import { login, getUserInfo, getUserDetail } from '@/api/user'
const state = {
  // 每次登录先从缓存中读取token
  token: getToken() || null, // 登录的etoken
  userInfo: {} // 用户信息
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
  },
  // 用户信息
  getInfo(state, data) {
    state.userInfo = data
  },
  // 删除用户信息
  removeInfo(state) {
    state.userInfo = {}
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
    setTimeStamp()// 设置当前时间戳
  },
  // 获取用户信息方法
  async getUserInfoAsync(context) {
    const result = await getUserInfo()
    console.log('用户信息接口请求成功', result)
    // 获取用户详情信息
    const baseinfo = await getUserDetail(result.userId)
    context.commit('getInfo', { ...result, ...baseinfo }) // 调用同步方法
    return result // 返回   给我们后期做权限的伏笔
  },
  // 退出登录
  async lgout(context) {
    context.commit('removeToken')
    context.commit('removeInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
