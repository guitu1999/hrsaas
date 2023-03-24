<template>
  <!-- 公共导入组件 -->
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async success({ header, results }) {
      console.log('打印', header, results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // 第一种 使用 foreach+Object.keys+push
      // const newarray = []
      // results.forEach(item => {
      //   const form = {}
      //   Object.keys(item).forEach(key => {
      //     form[userRelations[key]] = item[key]
      //   })
      //   array.push(form)
      //   // console.log('Object.keys', Object.keys(item))
      //   // ['手机号', '姓名', '入职日期', '转正日期', '工号']
      // })
      // console.log('新数组', newarray)
      // -------------------------------
      // 第二种 使用map
      const newarray = results.map(item => {
        const form = {}
        Object.keys(item).forEach(key => {
          form[userRelations[key]] = item[key]
        })
        return form
        // console.log('打印', Object.keys(item))
      })
      console.log('新数组', newarray)
      await importEmployee(newarray)// 调用接口
      this.$message.success('导入成功')
      this.$router.back() // 回退上一个页面
    }
  }
}
</script>

<style scoped></style>
