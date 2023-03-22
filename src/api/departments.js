import request from '@/utils/request'

// 获取组织架构
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
// 删除组织架构
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
// 添加部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
