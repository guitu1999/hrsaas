import request from '@/utils/request'

// 获取所有角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 获取企业信息
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
// 删除角色
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 编辑角色详情
export function updateRole(data) {
  return request({
    method: 'put',
    url: `/sys/role/${data.id}`,
    data
  })
}
// 新增角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'POST'
  })
}

