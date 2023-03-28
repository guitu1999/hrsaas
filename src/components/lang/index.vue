<template>
  <el-dropdown trigger="click" @command="changeLang">
    <!-- 显示一个图标 -->
    <div>
      <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh">中文</el-dropdown-item>
      <el-dropdown-item command="en">en</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  methods: {
    // 切换语言
    changeLang(type) {
      console.log('type', type)
      // 先写入到cookie  缓存
      Cookie.set('language', type)
      console.log('打印111', this.$i18n)
      this.$nextTick(() => {
        // 改变当前的语言
        this.$i18n.locale = type
      })
    }
  }
}
</script>

<style scoped></style>
