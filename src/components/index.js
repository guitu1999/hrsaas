import PageTools from './PageTools'// 公共的头部组件
import UploadExcel from './UploadExcel'// 导入excel组件
import ImageUpload from './ImageUpload' // 导入图片上传组件
import Print from 'vue-print-nb' // 引入打印
// 导出
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.use(Print)
  }
}
