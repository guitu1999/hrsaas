<template>
  <!-- 工作日历 -->
  <div>
    <!-- 年和月 -->
    <el-row type="flex" justify="end">
      <!-- 年份 -->
      <el-select v-model="nowYear" size="small" style="width: 120px;">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <!-- 月份 -->
      <el-select v-model="nowMonth" size="small" style="width: 120px;margin-left: 10px;">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <el-calendar v-model="value" />
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: Date,
      default: new Date()
    }
  },
  data() {
    return {
      yearList: [], // 要遍历的年的数组
      nowYear: null, // 当前年份
      nowMonth: null // 当前月份
    }
  },
  created() {
    console.log('打印事件', this.startDate)
    this.nowYear = this.startDate.getFullYear()
    this.nowMonth = this.startDate.getMonth() + 1
    this.yearList = Array.from(Array(11), (value, index) => this.nowYear + index - 5)
  }
}
</script>

<style  scoped>
/* /deep/ 如果报了语法错误，那么改成::v-deep这种写法就不报错了 */
::v-deep .el-calendar-day {
  height: auto;
}

::v-deep .el-calendar-table__row td,
::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}

.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}

.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}

.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;

}

/deep/ .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}

/deep/ .el-calendar__header {
  display: none
}
</style>

