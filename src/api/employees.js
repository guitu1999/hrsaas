// 员工模块
import request from '@/utils/request'

// 获取员工简单数据
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
// 获取员工详细数据
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
