<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!--组织架构  -->
      <el-card class="tree-card">
        <TreeTool :tree-node="company" :is-rooter="true" @addDepts="addDepts" />

        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree :default-expand-all="true" :data="departs" :props="defaultProps">
          <TreeTool slot-scope="{data}" :tree-node="data" @editDepts="editDepts" @addDepts="addDepts"
            @delDepts="getDepartments" />
        </el-tree>
      </el-card>
    </div>
    <addDept ref="addDept" :tree-node="node" :show-dialog.sync="showDialog" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTool from './components/tree-tool.vue'
import addDept from './components/add-dept.vue'
import { tranListToTreeData } from '@/utils'
import { getDepartments } from '@/api/departments'
export default {
  components: {
    TreeTool,
    addDept
  },
  data() {
    return {
      // 新增company属性
      company: { name: '', manager: '' },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showDialog: false, // 是否显示添加弹窗
      node: null // 当前点击的节点部门信息
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
        this.company = { name: result.companyName, manager: '负责人', id: '' }
        this.departs = tranListToTreeData(result.depts, '')
      } catch (err) {
        console.log('部门列表接口请求失败', err)
      }
    },
    // 添加部门
    addDepts(node) {
      this.showDialog = true // 显示弹窗
      this.node = node
    },
    // 编辑部门
    editDepts(node) {
      this.showDialog = true // 显示弹窗
      this.node = node
      // 调用子组件的获取部门详情方法
      this.$refs.addDept.getDepartDetail(node.id)
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

