<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="canBtn">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group v-model="userList">
      <!-- 选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="suerBtn">确定</el-button>
        <el-button size="small" @click="canBtn">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/settings'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [], // 所有角色列表
      userList: [] // 用户当前的角色
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取所有角色列表
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    // 查询当前用户的角色  去父组件调用此方法
    async getUserDetail(id) {
      const { roleIds } = await getUserDetail(id)
      this.userList = roleIds
    },
    // 确定
    async suerBtn() {
      await assignRoles({ id: this.userId, roleIds: this.userList })
      this.$emit('update:showRoleDialog', false)
    },
    // 取消
    canBtn() {
      this.userList = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

