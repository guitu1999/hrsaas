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
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger" @click="toExcel">excel导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 表格 -->
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="头像" align="center">
          <template v-slot="{ row }">
            <img v-imgError="require('@/assets/common/bigUserHeader.png')" :src="row.staffPhoto"
              style="border-radius: 50%; width: 100px; height: 100px; padding: 10px" @click="lookCode(row.staffPhoto)">
          </template>
        </el-table-column>
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatter" />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="">
          <template slot-scope="{row}">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template slot-scope="{row}">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="delBtn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px;">
        <el-pagination :current-page="page.page" :page-size="page.size" :total="page.total" layout="prev, pager, next"
          @current-change="changePage" />
      </el-row>
    </div>
    <!-- sync  子组件改变父组件 的语法糖 -->
    <addEmployee :show-dialog.sync="showDialog" />
    <!-- 二维码弹窗 -->
    <el-dialog title="二维码" :visible.sync="showCode">
      <el-row type="flex" justify="center">
        <canvas ref="code" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import { getEmployeeList, delEmployee } from '@/api/employees'
import addEmployee from './components/add-employee.vue'
import { formatDate } from '@/filters' // 引入时间处理过滤器
import QrCode from 'qrcode' // 引入二维码
export default {
  components: {
    addEmployee
  },
  data() {
    return {
      loading: false,
      list: [], // 员工列表
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      showDialog: false,
      showCode: false // 显示二维码
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
    },
    // 格式化内容
    formatter(row, column, cellValue, index) {
      const data = EmployeeEnum.hireType.find(item => item.id === +cellValue)
      // console.log('打印data', data)
      if (data) {
        return data.value
      }
      return '未知'
    },
    // 删除员工
    async delBtn(id) {
      try {
        await this.$confirm('确定删除该员工吗?')
        await delEmployee(id)
        this.$message('删除成功')
        this.getEmployeeList()
      } catch (err) {
        console.log('err', err)
      }
    },
    // 导出excel
    async toExcel() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 获取接口中的全部数据
      const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
      console.log('打印rows', rows)
      // 调用数据处理方法
      const data = this.formatJson(headers, rows)
      // 懒加载  只有点击的时候才导入
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']] // 复杂表头
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']// 合并的表头
      import('@/vendor/Export2Excel').then(excel => {
        // console.log('导出', excel)
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头
          data: data, // 数据
          filename: '员工信息表', // 表格名称
          autoWidth: true, // 是否自适应
          bookType: 'xlsx', // 导出格式
          multiHeader, // 复杂表头
          merges // 合并的部分
        })
      })
    },
    // 数组转成二维数组[[]]
    formatJson(headers, list) {
      console.log('1111', headers, list)
      return list.map((item) => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // 时间的处理
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            // 聘用形式的处理   find返回当前找到的对象
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
    },
    // 显示二维码
    lookCode(url) {
      if (!url) {
        return this.$message('暂未上传头像')
      }
      // 显示弹窗
      this.showCode = true
      // 等待dom更新完毕
      this.$nextTick(() => {
        QrCode.toCanvas(this.$refs.code, url)
      })
    }
  }

}
</script>

<style></style>

