import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工',
        icon: 'people'

      }
    },
    {
      // 员工详情页
      path: 'detail/:id?', // 动态路由传参  ?表示有无id都可以访问
      component: () => import('@/views/employees/detail'),
      hidden: true, // 是否在左侧导航栏显示
      meta: {
        title: '员工详情'
      }
    }
  ]
}
