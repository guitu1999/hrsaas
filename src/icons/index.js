import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 注册全局组件
Vue.component('svg-icon', SvgIcon)
// 读取索取所有 svg
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// 以上两行代码的含义  就是将所有的svg目录下的所有的 .svg后缀的文件
// 全部引入到项目中
