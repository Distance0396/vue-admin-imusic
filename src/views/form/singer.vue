<template>
  <div class="app-container">
    <el-form ref="form" :model="singer" label-width="120px" size="mini">
      <div class="flex">
        <el-form-item label="歌手姓名">
          <el-input v-model="singer.name" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="singer.type" placeholder="选择歌手类型">
            <el-option label="男歌手" value="1" />
            <el-option label="女歌手" value="2" />
            <el-option label="团体" value="3" />
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="添加照片">
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
      <el-form-item label="简介">
        <el-input v-model="singer.description" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { save } from '@/api/Singer'

export default {
  data() {
    return {
      singer: {
        name: undefined,
        type: undefined,
        avatar: undefined,
        description: undefined
      }
    }
  },
  methods: {
    async onSubmit() {
      const postData = this.$qs.stringify({
        name: this.singer.name,
        type: this.singer.type,
        avatar: this.singer.avatar,
        description: this.singer.description
      })
      // const params = new URLSearchParams()
      // params.append('name', this.singer.name)
      // params.append('type', this.singer.type)
      // params.append('avatar', this.singer.avatar)
      // params.append('description', this.singer.description)
      console.log('params' + postData)
      await save(postData).then(res => {
        this.$message('添加成功')
      })
    },
    uploadOk(response, file, fileList) {
      this.singer.avatar = response.data
    },
    // 校验数据类型与大小
    beforeAvatarUpload(file) {
      const isMP3 = file.type === 'image/jpeg'
      const isLt100M = file.size / 1024 / 1024 < 10

      if (!isMP3) {
        this.$message.error('上传音频只能是 image/jpeg 格式!')
      }
      if (!isLt100M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isMP3 && isLt100M
    },
    onCancel() {
      this.$emit('FormVisible')
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.flex{
  display: flex;
}
</style>

