<template>
  <div class="app-container">
    <el-form ref="form" :model="album" label-width="auto">
      <el-form-item label="歌手">
        <el-input v-model="album.singerName" />
      </el-form-item>
      <el-form-item label="专辑名称">
        <el-input v-model="album.name" />
      </el-form-item>
      <el-form-item label="发行时间">
        <el-col :span="11">
          <el-date-picker v-model="album.releaseTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="添加封面">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8011/common/upload"
          :before-upload="beforeAvatarUpload"
          :auto-upload="true"
          :on-success="uploadOk"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传image/jpeg文件，且不超过10mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="歌词" style="height: 60px; line-height: 60px;">
        <el-input v-model="album.description" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { save } from '@/api/album'

export default {
  data() {
    return {
      album: {
        singerName: '',
        name: '',
        image: '',
        releaseTime: '',
        description: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      if (!this.album.singerName && !this.album.name && !this.album.image && !this.album.releaseTime) {
        this.onCancel()
        this.$message({
          message: '数据为空',
          type: 'warning'
        })
        return
      }
      await save(this.album).then(res => {
        this.$message({
          message: '添加为空',
          type: 'success'
        })
      })
      this.onCancel()
    },
    // 上传音乐后的回调函数
    uploadOk(response) {
      this.album.image = response.data
    },
    // 上传音乐的校验函数
    beforeAvatarUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isImage) {
        this.$message.error('上传音频只能是 png/jpg 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isImage && isLt10M
    },
    // 取消页面函数
    onCancel() {
      this.$emit('update:dialog-form-visible', false)
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

