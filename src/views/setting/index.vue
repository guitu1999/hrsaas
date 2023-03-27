<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="addRole">新建角色</el-button>
            </el-row>
            <el-table border="" :data="list">
              <el-table-column align="center" type="index" label="序号" width="120" />
              <el-table-column align="center" prop="name" label="角色名称" width="240" />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success" @click="assignPerm(scope.row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editBtn(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delBtn(scope.row.id)">删除</el-button>
                </template>

              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height: 60px;">
              <el-pagination :total="page.total" :current-page="page.page" layout="prev, pager, next"
                :page-size="page.pagesize" @current-change="changePage" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" show-icon :closable="false" />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="formData.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />

        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="分配权限" :visible="showPermDialog" @close="btnPermCancel">
      <el-tree ref="tree" :show-checkbox="true" :default-checked-keys="checkedList" :check-strictly="true" node-key="id"
        :default-expand-all="true" :props="propsObj" :data="permData" />
      <!-- 确定 取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole, assignPerm } from '@/api/settings'
import { tranListToTreeData } from '@/utils'
import { getPermissionList } from '@/api/permission'
export default {
  data() {
    return {
      list: [], // 角色列表信息
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      formData: {}, // 企业信息
      showDialog: false, // 显示弹窗
      showPermDialog: false, // 控制分配权限弹层的显示后者隐藏
      permData: [], // 专门用来接收权限数据 树形数据
      propsObj: {
        label: 'name' // 当前显示的节点信息
      },
      roleForm: {
        description: '',
        name: ''
      }, // 当前的员工信息
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      checkedList: [], // 当前选中的权限
      roleId: null // 角色id
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    showTitle() {
      return this.roleForm.id ? '编辑角色' : '添加角色'
    }
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
      console.log('打印list', this.list)
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    // 改变分页的页数
    changePage(val) {
      this.page.page = val
      this.getRoleList()
    },
    // 删除角色
    async delBtn(id) {
      try {
        await this.$confirm('确认删除该角色吗')
        await deleteRole(id)
        this.$message.success('删除成功')
        this.getRoleList()
      } catch (err) {
        this.$message('取消删除')
      }
    },
    // 编辑按钮
    async editBtn(id) {
      this.showDialog = true
      this.roleForm = await getRoleDetail(id)
    },
    // 确定按钮
    btnOK() {
      // 校验规则
      this.$refs.roleForm.validate().then(async () => {
        // 校验通过
        // 编辑
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          // 添加
          await addRole(this.roleForm)
        }
        // 更新页面 关闭弹窗
        this.getRoleList()
        this.showDialog = false
        this.$message.success('操作成功')
      }).catch(err => [
        this.$message('请输入必填项', err)
      ])
    },
    // 取消按钮
    btnCancel() {
      // 关闭弹窗
      this.showDialog = false
      // 清空表单
      this.roleForm = {
        description: '',
        name: ''
      }
      // 移除校验
      this.$refs.roleForm.resetFields()
    },
    // 新增角色
    addRole() {
      // 显示弹窗
      this.showDialog = true
    },
    // 获取分配权限
    async assignPerm(id) {
      this.permData = tranListToTreeData(await getPermissionList(), '0')
      this.showPermDialog = true
      this.roleId = id
      const { permIds } = await getRoleDetail(id) // permIds是当前角色所拥有的权限点数据
      this.checkedList = permIds
    },
    // 分配权限
    async btnPermOK() {
      await assignPerm({ permIds: this.$refs.tree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.showPermDialog = false
    },
    // 取消
    btnPermCancel() {
      this.checkedList = []
      this.showPermDialog = false
    }
  }
}
</script>

<style></style>

