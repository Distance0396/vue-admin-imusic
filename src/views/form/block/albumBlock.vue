<template>
  <div class="app-container">
    <el-form ref="form" :model="album" label-width="auto">
      <el-form-item label="歌手">
        <el-input v-model="album.singerName" :disabled="album.musicList != null" />
      </el-form-item>
      <el-form-item label="专辑名称">
        <el-input v-model="album.name" />
      </el-form-item>
      <el-form-item label="发行时间">
        <el-col :span="11">
          <el-date-picker v-model="album.releaseTime" type="date" value-format="yyyy-MM-dd HH:mm" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item v-if="album.image != null && music != null" label="修改封面">
        <el-upload
          class="avatar-uploader"
          drag
          action="http://localhost:8011/common/upload"
          :before-upload="beforeAvatarUpload"
          :auto-upload="true"
          :on-success="uploadOk"
        >
          <el-image v-if="album" :src="album.image" :fit="cover" class="avatar" />
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传image/jpeg文件，且不超过10mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item v-else label="添加封面">
        <el-upload
          class="avatar-uploader"
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

      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <div class="left">
      <el-form>
        <el-form-item label="介绍">
          <el-input v-model="album.description" type="textarea" autosize />
        </el-form-item>
      </el-form>
      <el-table v-if="music != null" :data="music">
        <el-table-column property="name" label="歌曲名称" width="350" />
        <el-table-column property="count" label="播放次数" width="200" />
        <el-table-column property="status" label="状态" />
      </el-table>
    </div>
  </div>
</template>

<script>

import { save, update } from '@/api/album'

export default {
  data() {
    return {
      album: {
        singerName: '',
        name: '',
        image: '',
        releaseTime: '',
        description: ''
      },
      music: null
    }
  },
  methods: {
    add(album, music) {
      this.album = album
      this.music = music
    },
    async onSubmit() {
      if (!this.album.singerName && !this.album.name && !this.album.image && !this.album.releaseTime) {
        this.onCancel()
        this.$message({
          message: '数据为空',
          type: 'warning'
        })
        return
      }
      if (this.music) {
        await update(this.album).then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      } else {
        await save(this.album).then(() => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
      }
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
.app-container{
  display: flex;
  justify-content: flex-start;
  .el-form{
    margin-right: 150px;
    width: 400px;
    .el-form-item{
      .el-input{
        margin-left: 0;
        width: 100%;
      }
    }
    .avatar-uploader{
      .el-upload-dragger{
        width: 100%;
      }
    }
  }
}
</style>
