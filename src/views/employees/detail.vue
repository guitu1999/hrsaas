<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form ref="form" :date="form" :rules="rules" label-width="120px"
              style="margin-left: 120px; margin-top:30px">
              <el-form-item prop="username" label="姓名:">
                <el-input v-model="form.username" style="width:300px" />
              </el-form-item>
              <el-form-item prop="password2" label="密码:">
                <el-input v-model="form.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="editInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <component :is="JobInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { saveUserDetailById } from '@/api/employees'
import { getUserDetail } from '@/api/user'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      JobInfo: 'JobInfo', // 组件名
      userId: this.$route.params.id, // 用户id
      form: {
        username: '',
        password2: ''
      },
      // 校验规则
      rules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '姓名不能为空'
          }
        ],
        password2: [
          {
            required: true,
            trigger: 'blur',
            message: '密码不能为空'
          },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserDetail()
    console.log('打印这个id', this.userId)
  },
  methods: {
    // 获取员工信息
    async getUserDetail() {
      this.form = await getUserDetail(this.userId)
    },
    // 编辑个人信息
    async editInfo() {
      try {
        // 校验
        await this.$refs.form.validate()
        await saveUserDetailById({ ... this.form, password: this.form.password2 })
        this.$message.success('保存成功')
      } catch (err) {
        console.log('错误', err)
      }
    }
  }
}
</script>

<style></style>

