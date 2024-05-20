<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="歌手">
        <el-input v-model="form.singer"/>
      </el-form-item>
      <el-form-item label="歌曲名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="所属专辑">
        <el-select v-model="form.album" placeholder="选择所属专辑">
          <el-option label="单曲" value="0"></el-option>
          <el-option label="不是单曲" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加音乐">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8011/common/upload"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="true">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传audio/mp3文件，且不超过100mb</div>
        </el-upload>
      </el-form-item>
      <!--      添加的歌曲为单曲时不显示发行时间选项-->
      <el-form-item v-show="form.record !== '0'" label="发行时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item v-show="form.record !== '0'" label="次序">
        <el-input v-model="form.sort"/>
      </el-form-item>
      <el-form-item label="歌词">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { upload } from '@/api/common'

export default {
  data() {
    return {
      imageUrl: '',
      form: {
        // 歌手名
        singer: '',
        // 音乐名
        name: '',
        // 所属专辑
        album: '0',
        date1: '',
        sort: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    uploadOk(event) {
      console.log('uploadOk')
      console.log(event)
      const formData = new FormData()
      formData.append('file', event.file)
      upload(formData).then(res => {
        console.log(res)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
      // console.log(file)
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      this.audio = file
      console.log(file)
      const isMP3 = file.type === 'audio/mpeg'
      const isLt100M = file.size / 1024 / 1024 < 100

      if (!isMP3) {
        this.$message.error('上传音频只能是 mp3 格式!')
      }
      if (!isLt100M) {
        this.$message.error('上传音频大小不能超过 100MB!')
      }
      return isMP3 && isLt100M
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

