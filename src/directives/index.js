// 负责管理所有自定义指令
export const imgError = {
  // 指令对象  dom元素插入到节点之后执行
  inserted(dom, options) {
    // dom表示当前指令作用的dom对象
    // dom现在就是img
    // options是指令的变量的解释  其中一个属性叫做value
    dom.onerror = function () {
      console.log('图片加载失败')
      // 图片异常
      dom.src = options.value// 此处为动态值
    }
  }
}
