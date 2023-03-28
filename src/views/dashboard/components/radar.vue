<template>
  <div ref="echart" class="radar-echart" />
</template>

<script>
// 完整加载过程
// var echarts = require('echarts')

// 改成按需加载
var echarts = require('echarts/lib/echarts') // 引入echarts主模块
require('echarts/lib/chart/radar') // 引入雷达图
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import { GridComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
// BUG: 如果首页雷达图报错[ECharts] Component legend is used but not imported.
require('echarts/lib/component/legend')
echarts.use([GridComponent, LineChart])
export default {
  mounted() {
    var myChart = echarts.init(this.$refs.echart)
    var option = {
      title: {
        text: '基础雷达图'
      },
      tooltip: {},
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        // 每个区域的最高值
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [10, 1, 100, 5, 100, 0],
            name: '张三'
          },
          {
            value: [50, 50, 50, 50, 50, 10],
            name: '李四'
          }
        ]
      }]

    }
    myChart.setOption(option)
  }
}
</script>

<style scoped>
.radar-echart {
  width: 600px;
  height: 400px;
  border: 1px solid #000;
}
</style>
