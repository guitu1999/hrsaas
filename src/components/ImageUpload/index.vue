<template>
  <div>
    <!-- action 为要上传到的地方 -->
    <el-upload :class="{ showImg: fileComputed }" :limit="1" :file-list="fileList" list-type="picture-card" action="#"
      :on-preview="previewImg">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="dialogVisible">
      <img :src="imgUrl" style="width: 100%;">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: '', // 图片地址
      dialogVisible: false, // 图片预览弹窗
      fileList: [{ url: 'https://img2.baidu.com/it/u=3618236253,1028428296&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679850000&t=1267ebdc06f172b2db194aa8c92400e2' }]
    }
  },
  // 计算属性
  computed: {
    // 判断是否显示图片上传
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 预览图片
    previewImg(file) {
      console.log('file', file)
      this.imgUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.showImg .el-upload--picture-card {
  display: none;
}
</style>
