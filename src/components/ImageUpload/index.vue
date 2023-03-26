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
// 引入COS 腾讯云sdk
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
      fileList: [],
      nowImgid: null // 当前上传的图片id
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
      this.nowImgid = file.uid
      console.log('打印当前上传的图片id', this.nowImgid)
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
      }, (err, data) => {
        // 上传的回调函数
        console.log(err || data)
        if (data.statusCode === 200 && !err) {
          // 查找文件列表中 与 当前上传的文件id  替换地址为腾讯云的新地址
          this.fileList = this.fileList.map(item => {
            if (item.uid === this.nowImgid) {
              // console.log('打印item', item)
              // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
              // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
              return { url: 'http://' + data.Location, upload: true }
            }
            return item // 上传多张图片  其他的返回
          })
        }
        console.log('打印上传后的图片数组', this.fileList)
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
