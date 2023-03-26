<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部组件 -->
      <PageTools>
        <el-button slot="right" type="primary" size="small">
          添加权限
        </el-button>
      </PageTools>
      <!-- 表格 -->
      <el-table border>
        <el-table-column align="center" label="名称" />
        <el-table-column align="center" label="标识" />
        <el-table-column align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template>
            <el-button type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style></style>

