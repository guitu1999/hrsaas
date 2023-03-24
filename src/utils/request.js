// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'

// 引入store 实例
import store from '@/store/index'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth' // 读取当前时间戳

// 引入router
import router from '@/router/index'
// 定义超时时间
const TimeOut = 3600 // 定义超时时间

// 创建一个axios的实例
const service = axios.create({
  // 当执行npm run div=> .evn.development=> /api =>跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // 两个值(开发环境或生产环境)
  timeout: 5000 // 超时时间
})
// 请求拦截器
service.interceptors.request.use(
  // config是请求的配置信息
  // 注入token
  config => {
    // 判断是否有token
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
      // 有token 检查时间戳是否超时
      const result = checkTime()
      if (result) {
        // 超时  退出登录  清除缓存
        store.dispatch('user/lgout') // 调取退出操作
        router.push('/login')
        return Promise.reject(new Error('token超时了'))
      }
    }
    return config // 必须要返回的
  },
  error => {
    return Promise.reject(error)
  }
)

// 定义检查时间戳方法
function checkTime() {
  console.log('检查时间戳')
  // 当前时间 - 缓存时间 >超时时间
  const NowTime = Date.now()
  const timestamp = getTimeStamp()
  return (NowTime - timestamp) / 1000 > TimeOut
}

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
    // error 里 有个response对象
    // 后端返回10002  token失效
    if (error.response && error.respoonse && error.respoonse.data && error.respoonse.data.code === 10002) {
      store.dispatch('user/lgout')
      router.push('/login')
    } else {
      Message.error(error.message)// 提示错误信息
    }
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出(then)成功 进入catch
  }
)
export default service // 导出axios实例
