<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部 -->
      <PageTools :show-left="true">
        <!-- 左侧 -->
        <template v-slot:left>
          <span>共{{ page.total }}条数据</span>
        </template>
        <!-- 右侧 -->
        <template #right>
          <el-button size="small" type="success">excel导入</el-button>
          <el-button size="small" type="danger">excel导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 表格 -->
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
        <el-table-column label="账户状态" sortable="" prop="enableState" />
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px;">
        <el-pagination :current-page="page.page" :page-size="page.size" :total="page.total" layout="prev, pager, next"
          @current-change="changePage" />
      </el-row>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
export default {
  data() {
    return {
      loading: false,
      list: [], // 员工列表
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取员工列表
    async getEmployeeList() {
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
    },
    // 改变页数
    changePage(val) {
      this.page.page = val
      this.getEmployeeList()
    }
  }

}
</script>

<style></style>

