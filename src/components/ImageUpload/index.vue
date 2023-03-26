<template>
  <div>
    <!-- action 为要上传到的地方 -->
    <el-upload :http-request="uploadImg" :before-upload="beforeUpload" :limit="1" :file-list="fileList"
      list-type="picture-card" action="#" :class="{ showImg: fileComputed }" :on-preview="previewImg" :on-remove="delImg"
      :on-change="changeFile">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="dialogVisible">
      <img :src="imgUrl" style="width: 100%;">
    </el-dialog>
  </div>
</template>

<script>
// 引入COS
import COS from 'cos-js-sdk-v5'
// 实例化
var cos = new COS({
  SecretId: 'AKIDSBdoiMjpfEXZJn0wc2C6k6D4dvxiCOJx', // 身份识别的id
  SecretKey: 'OWMwFH2XmkRqzrRknY2FCPL0OVKsACxR' // 身份识别的密钥
})
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
    },
    // 删除图片
    delImg(file, filelist) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      console.log(this.fileList)
    },
    // 上传图片
    // 添加文件、上传成功和上传失败时都会被调用(执行多次)
    changeFile(file, filelist) {
      // console.log('file', file)
      // console.log('filelist', filelist)
      this.fileList = filelist.map(item => item)
    },
    // 上传图片之前
    beforeUpload(file) {
      console.log('上传之前', file)
      // 判断上传的类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 判断上传的大小  1mb=1024kb 1kb=1024b
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传图片只能小于5M')
        return false
      }
      // 返回一个true   允许上传
      return true
    },
    // 上传至腾讯云
    uploadImg(pramas) {
      console.log('pramas', pramas)
      cos.putObject({
        Bucket: 'guitu-1259043284', // 存储桶名称
        Region: 'ap-beijing', // 存储桶所在地域
        Key: 'params.file.uid', // 对象在存储桶中的唯一标识
        Body: pramas.file // 上传的文件对象
      }, function (err, data) {
        // 上传的回调函数
        console.log(err || data)
      }
      )
    }

  }
}
</script>

<style >
.showImg .el-upload--picture-card {
  display: none;
}
</style>
