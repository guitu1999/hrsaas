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
// 删除员工
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
// 新增员工
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
// 员工导入
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
// 更改保存员工信息
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
