import PageTools from './PageTools'// 公共的头部组件
import UploadExcel from './UploadExcel'// 导入excel组件
// 导出
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
