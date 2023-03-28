import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Component from '@/components/index' // 引入全局组件
import * as directives from '@/directives' // 引入自定义指令
import * as filters from '@/filters/index' // 引入过滤器
import i18n from '@/lang' // 引入多语言
import '@/icons' // icon
import '@/permission' // 权限管理
import checkPermission from '@/mixin/checkPermission' // 引入mixin
Vue.mixin(checkPermission) // 表示所有的组件都拥有了检查的方法
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]) // 注册自定义指令
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) // 注册全局过滤器
})
// set ElementUI lang to EN
Vue.use(ElementUI, {
  // i18n根据当前locale属性去寻找对应的显示内容
  // 去对应的语言包里寻找对应的内容
  i18n: (key, value) => i18n.t(key, value)
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(Component) // 注册全局组间
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
