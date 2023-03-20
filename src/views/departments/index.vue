<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!--组织架构  -->
      <el-card class="tree-card">
        <el-row type="flex" justify="space-between" align="middle" style="height:40px">
          <!-- 左侧内容 -->
          <el-col>江苏传智播客教育科技股份有限公司</el-col>
          <!-- 右侧内容 -->
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 -->
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree :data="departs" :props="defaultProps">
          <!-- 插槽内容会循环多次 data是每个节点的数据对象 -->
          <el-row slot-scope="{data}" type="flex" justify="space-between" align="middle" style="height:40px;width: 100%;">
            <!-- 左侧内容 -->
            <el-col>{{ data.name }}</el-col>
            <!-- 右侧内容 -->
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 下拉菜单 -->
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑子部门</el-dropdown-item>
                      <el-dropdown-item>删除子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会' }] },
        { name: '行政部', manager: '曹操' },
        { name: '人事部', manager: '曹操' }
      ]

    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>

