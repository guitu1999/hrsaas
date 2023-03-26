// 负责管理所有自定义指令
export const imgError = {
  // 指令对象  dom元素插入到节点之后执行
  // inserted  只会执行一次
  inserted(dom, options) {
    // 判断dom是否存在  不存在就改成默认值
    dom.src = dom.src || options.value

    // dom表示当前指令作用的dom对象
    // dom现在就是img
    // options是指令的变量的解释  其中一个属性叫做value
    dom.onerror = () => {
      console.log('图片加载失败')
      // 图片异常
      dom.src = options.value// 此处为动态值
    }
  },
  // 钩子函数  组件更新后的状态
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
