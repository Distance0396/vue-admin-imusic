<script>
import { save, update } from '@/api/singer'

export default {
  data() {
    return {
      singer: {
        name: '',
        type: '',
        avatar: '',
        description: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      if (!this.singer.name) {
        return this.$message({
          message: '数据为空',
          type: 'warning'
        })
      }
      if (this.singer.id) {
        await update(this.singer).then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      } else {
        await save(this.singer).then(() => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
      }
      this.onCancel()
    },
    // 图片上传成功回调
    uploadOk(response) {
      this.singer.avatar = response.data
    },
    // 校验数据类型与大小
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
    },
    // ref
    update(singer) {
      this.singer = singer
    }
  }
}
</script>

<template>
  <el-form ref="form" :model="singer" label-width="120px">
    <el-form-item label="歌手姓名">
      <el-input v-model="singer.name" />
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="singer.type" placeholder="选择歌手类型" style="min-width: 200px; width: 100%">
        <el-option label="男歌手" :value="1" />
        <el-option label="女歌手" :value="2" />
        <el-option label="团体" :value="3" />
      </el-select>
    </el-form-item>
    <el-form-item :label="singer.id ? '修改头像' : '添加头像' ">
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8011/common/upload"
        :before-upload="beforeAvatarUpload"
        :auto-upload="true"
        :on-success="uploadOk"
      >
        <el-image v-if="singer.avatar" :src="singer.avatar" class="avatar" />
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传image/jpeg文件，且不超过10mb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="singer.description" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">上传</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.line {
  text-align: center;
}
.el-form{
  width: 400px;
}
.avatar{
  width: 100%;
}
</style>

