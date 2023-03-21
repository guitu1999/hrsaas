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
import { tranListToTreeData } from '@/utils'
import { getDepartments } from '@/api/departments'
export default {
  components: {
    TreeTool
  },
  data() {
    return {
      // 新增company属性
      company: { name: '', manager: '' },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }

    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取部门列表
    async getDepartments() {
      try {
        const result = await getDepartments()
        this.company = { name: result.companyName, manager: '负责人' }
        this.departs = tranListToTreeData(result.depts, '')
      } catch (err) {
        console.log('部门列表接口请求失败', err)
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

