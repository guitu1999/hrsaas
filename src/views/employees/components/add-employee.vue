<template>
  <el-dialog :visible="showDialog" title="添加员工">
    <el-form :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="username" label="姓名">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="mobile" label="手机">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="timeOfEntry" label="入职时间">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item prop="formOfEmployment" label="聘用形式">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option v-for="obj in EmployeeEnum.hireType" :key="obj.id" :label="obj.value" :value="obj.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="workNumber" label="工号">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item prop="departmentName" label="部门">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="chooseDepart" />
        <el-tree v-if="showTree" v-loading="loading" :data="treeList" :default-expand-all="true"
          :props="{ label: 'name' }" @node-click="chooseNode" />
      </el-form-item>
      <el-form-item prop="correctionTime" label="转正时间">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>

    <el-row name="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </el-col>

    </el-row>
  </el-dialog>
</template>

<script>
// 组织架构
import { getDepartments } from '@/api/departments'
// 引入 转成属性结构方法
import { tranListToTreeData } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      treeList: [], // 部门列表
      showTree: false, // 显示树形结构
      loading: false, // 加载状态
      rules: {
        username: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            message: '名字字符为2-4个字符串',
            min: 2,
            max: 4
          }
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'

          }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 选择部门
    async chooseDepart() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      // console.log('depts', depts)
      this.treeList = tranListToTreeData(depts, '')
      this.loading = false
    },
    // 选择节点
    chooseNode(node) {
      // console.log(node)
      this.formData.departmentName = node.name
      this.showTree = false
    }
  }
}
</script>

<style scoped></style>
