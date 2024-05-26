<script>
import { save, update } from '@/api/music'
import { findSingerByName } from '@/api/singer'

export default {
  data() {
    return {
      music: {
        // 歌手名
        singerName: '',
        // 音乐名
        name: '',
        // 所属专辑
        albumId: '',
        // 发布时间
        releaseTime: '',
        // 歌词
        lyric: '',
        // 歌曲地址
        audio: '',
        // 单曲 单曲封面
        avatar: '',
        // 排序
        sort: ''
      },
      albumList: [],
      timer: ''
    }
  },
  methods: {
    // 提交添加音乐的函数
    async onSubmit() {
      // 提交前先判断数据是否为空
      if (!this.music.singerName && !this.music.name && !this.music.albumId && !this.music.releaseTime && !this.music.audio) {
        this.onCancel()
        return this.$message({
          message: '数据为空',
          type: 'warning'
        })
      }
      if (this.music.id) {
        await update(this.music).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      } else {
        await save(this.music).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
      }
      this.onCancel()
    },
    // 取消页面
    onCancel() {
      this.$emit('update:dialog-form-visible', false)
    },
    // 上传音乐后的回调函数
    handleAvatarSuccess(response, file, fileList) {
      this.music.audio = response.data
    },
    // 上传音乐的校验函数
    beforeAvatarUpload(file) {
      const isAudio = file.type === 'audio/mpeg' || file.type === 'audio/ogg'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isAudio) {
        this.$message.error('上传音频只能是 mp3/ogg 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传音频大小不能超过 10MB!')
      }
      return isAudio && isLt10M
    },
    // 节流
    timerHandler(e) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.searchHandler(e)
      }, 2000)
    },
    // 输入歌手名获取歌手专辑
    async searchHandler(e) {
      await findSingerByName(e).then(res => {
        this.albumList = res.data
      })
    },
    update(music) {
      this.music = music
      this.searchHandler(this.music.singerName)
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-form ref="form" :model="music" label-width="120px" >
      <el-form-item label="歌手">
        <el-input v-model="music.singerName" :debounce="1000" :disabled="music.id != null" @input="timerHandler"/>
      </el-form-item>
      <el-form-item label="歌曲名称">
        <el-input v-model="music.name"/>
      </el-form-item>
      <el-form-item label="所属专辑">
        <el-select v-model="music.albumId" :placeholder="music.albumName">
          <el-option label="单曲" :value="0"></el-option>
          <el-option v-for="album in albumList" :key="album.id" :label="album.name" :value="album.id"></el-option>
        </el-select>
      </el-form-item>
      <!--      添加的歌曲为单曲时不显示发行时间选项-->
      <el-form-item v-if="music.albumId === 0" label="发行时间">
        <el-col :span="11">
          <el-date-picker v-model="music.releaseTime" type="date" value-format="yyyy-MM-dd HH:mm" placeholder="Pick a date" style="width: 100%; min-width: 200px"/>
        </el-col>
      </el-form-item>
      <el-form-item v-show="music.albumId !== 0 && music.albumId !== null" label="次序">
        <el-input v-model="music.sort" />
      </el-form-item>
      <el-form-item v-if="music.albumId !== 0" label="添加音乐">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8011/common/upload/audio"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="true"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传mp3/ogg文件，且不超过10mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item v-else-if="music.albumId === 0" label="添加封面">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8011/common/upload"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="true"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传audio/mp3文件，且不超过10mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="歌词">
        <el-input v-model="music.lyric" type="textarea" :rows="10"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.line {
  text-align: center;
}
.flex{
  display: flex;
}
.app-container{
  display: flex;
  justify-self: flex-start;
  .el-form{
    margin-right: 150px;
    width: 400px;
    .el-form-item{
      .el-input{
        margin-left: 0;
        width: 100%;
      }
    }
  }
}
</style>

