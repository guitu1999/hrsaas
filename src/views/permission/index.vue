<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部组件 -->
      <PageTools>
        <el-button slot="right" type="primary" size="small" @click="addPermission(1, '0')">
          添加权限
        </el-button>
      </PageTools>
      <!-- 表格 -->
      <el-table :data="list" border="" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button v-if="row.type === 1" type="text" @click="addPermission(2, row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
        <!-- 表单 -->
        <el-form ref="permForm" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { updatePermission, addPermission, getPermissionDetail, delPermission, getPermissionList } from '@/api/permission'
import { tranListToTreeData } from '@/utils/index'
export default {
  data() {
    return {
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑' : '添加'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限列表
    async getPermissionList() {
      this.list = tranListToTreeData(await getPermissionList(), '0')
    },
    // 删除
    delPermission(id) {
      this.$confirm('确认删除该权限吗?').then(() => {
        return delPermission(id)
      }).then(() => {
        this.$message('删除成功')
        this.getPermissionList()
      })
    },
    // 添加权限
    addPermission(type, pid) {
      // 访问权的type=1 按钮操作权的type=2
      // pid 表示当前数据的父节点标识
      this.formData.pid = pid
      this.formData.type = type
      this.showDialog = true
    },
    // 确定
    btnOK() {
      this.$refs.permForm.validate().then(() => {
        if (this.formData.id) {
          // 表示要修改权限
          return updatePermission(this.formData)
        } else {
          // 否则就是添加权限
          return addPermission(this.formData)
        }
      }).then(() => {
        //  提示消息
        this.$message.success('操作成功')
        this.getPermissionList()
        this.showDialog = false
      })
    },
    // 取消
    btnCancel() {
      // 把数据重置
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      // 只能重置为最初的状态，还可以重置表单校验结果
      this.$refs.permForm.resetFields()
      this.showDialog = false
    },
    // 编辑按钮
    async editPermission(id) {
      // 根据获取id获取详情
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    }
  }
}
</script>

<style></style>

