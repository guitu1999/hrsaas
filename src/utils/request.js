// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
// 创建一个axios的实例
const service = axios.create({
  // 当执行npm run div=> .evn.development=> /api =>跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // 两个值(开发环境或生产环境)
  timeout: 5000 // 超时时间
})
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(
  // 成功回调函数
  (response) => {
    // axios默认加一层data
    const { message, success, data } = response.data
    // 判断success
    if (success) {
      return data
    } else {
      Message.error(message)
      // 业务错误 进入catch  创建一个错误对象new Error
      return Promise.reject(new Error(message))
    }
  },
  // 失败回调函数
  (error) => {
    Message.error(error.message)// 提示错误信息
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出(then)成功 进入catch
  }
)
export default service // 导出axios实例
