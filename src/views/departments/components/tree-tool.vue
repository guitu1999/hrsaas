<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px;width: 100%;">
    <!-- 左侧内容 -->
    <el-col>{{ treeNode.name }}</el-col>
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRooter" command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRooter" command="del">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    // 是否根节点
    isRooter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 添加 编辑 删除 部门
    handleCommand(type) {
      console.log('点击了', type)
      if (type === 'add') {
        // 添加部门  把当前的节点信息传递过去
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑
      } else if (type === 'del') {
        // 删除
        this.$confirm('确定删除该部门吗?').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          this.$message.success('删除部门成功')
          this.$emit('delDepts')
        })
      }
    }
  }
}
</script>

<style scoped></style>
