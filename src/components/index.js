import PageTools from './PageTools'// 公共的头部组件
import UploadExcel from './UploadExcel'// 导入excel组件
import ImageUpload from './ImageUpload' // 导入图片上传组件
import Print from 'vue-print-nb' // 引入打印
import ScreenFull from './ScreenFull' // 引入全屏
import ThemePicker from './ThemePicker' // 引入颜色改变
import LangSelect from './lang' // 多语言切换
// 导出
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('LangSelect', LangSelect)
    Vue.use(Print)
  }
}
