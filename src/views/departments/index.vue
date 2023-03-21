<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!--组织架构  -->
      <el-card class="tree-card">
        <TreeTool :tree-node="company" :is-rooter="true" />

        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree :data="departs" :props="defaultProps">
          <TreeTool slot-scope="{data}" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTool from './components/tree-tool.vue'
export default {
  components: {
    TreeTool
  },
  data() {
    return {
      // 新增company属性
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [
            {
              name: '董事会', manager: '曹丕'
            }
          ]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }

    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>

