// 多语言实例化
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie' // 引入cookie包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包
import customZH from './zh' // 引入自定义中文包
import customEN from './en' // 引入自定义英文包
// 完成注册国际化包
Vue.use(VueI18n)
// 导出
export default new VueI18n({
  locale: Cookie.get('language') || 'zh', // 从cookie中获取语言类型 获取不到就是中文  当前的语言类型
  messages: { // 当前的语言包  两种==>  饿了么语言包  自定义语言包
    en: {
      ...elementEN, // 将饿了么的英文语言包引入
      ...customEN // 自定义语言包
    },
    zh: {
      ...elementZH, // 将饿了么的中文语言包引入
      ...customZH// 自定义语言包
    }
  }
})
