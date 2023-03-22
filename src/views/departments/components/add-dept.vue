<template>
  <el-dialog title="添加子部门" :visible="showDialog">
    <el-form ref="formDept" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" style="width: 80%;" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" style="width: 80%;" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <el-select v-model="formData.manager" style="width: 80%;" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="obj in peoples" :key="obj.id" :value="obj.username" :label="obj.username" />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" style="width: 80%;" placeholder="1-50个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- 取消确定按钮 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="sureBtn">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    // 是否显示
    showDialog: {
      type: Boolean,
      default: false
    },
    // 传入当前的节点信息
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 校验方法
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      const result = depts.filter((item) => item.pid === this.treeNode.id).some(obj => obj.name === value)
      result ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      // alue不为空 因为我们的部门有可能没有code
      const result = depts.some(item => item.code === value && value)
      result ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      peoples: [], // 员工简单信息
      // 校验规则
      rules: {
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '长度为1-50个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: checkNameRepeat // 自定义函数的形式校验
          }
        ],
        code: [
          {
            required: true,
            message: '部门编码不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '长度为1-50个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: checkCodeRepeat // 自定义函数的形式校验
          }
        ],
        manager: [
          {
            required: true,
            message: '部门管理者不能为空',
            trigger: 'blur'
          }
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 300,
            message: '长度为1-300个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 获取简单员工信息
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    // 确定方法
    sureBtn() {
      this.$refs.formDept.validate(async isOk => {
        if (isOk) {
          console.log('校验成功')
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
          // 更新父页面数据
          this.$emit('addDepts')
        } else {
          console.log('校验失败')
        }
      })
    }
  }
}
</script>

<style scoped></style>
