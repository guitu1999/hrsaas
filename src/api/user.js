import request from '@/utils/request'

// 登录接口
export function login(data) {
  // 返回一个promise 对象
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
// 获取用户信息接口
export function getUserInfo(data) {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export function logout() {

}
