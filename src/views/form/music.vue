<script>
import MusicBlock from '@/views/form/block/musicBlock.vue'
import { changeStatus, getPageMusic, musicDetails } from '@/api/music'

export default {
  components: {
    MusicBlock
  },
  data() {
    return {
      // 接受返回的数据集
      tableData: [],
      // 勾选音乐行数组
      checkBoxList: [],
      // 勾选音乐行id数组
      idList: '',
      // 分页搜索对象
      page: {
        page: 1,
        pageSize: 8,
        name: '',
        albumName: '',
        singerName: '',
        status: null
      },
      // 总数据条数
      totalNum: 0,
      // 控制添加歌手块显示的显示
      dialogFormVisible: false,
      dialogForm: false
    }
  },
  created: function() {
    this.pageSearch()
  },
  methods: {
    // 分页查询
    async pageSearch() {
      const { data } = await getPageMusic(this.page)
      // 总数据条
      this.totalNum = data.total
      // 接受返回的数据集
      this.tableData = data.page

      this.page.name = null
      this.page.status = null
      this.page.albumName = null
      this.page.singerName = null
    },
    // 点击分页触发
    pageChange(e) {
      this.page.page = e
      this.pageSearch()
    },
    // 锁定歌手
    async closeStatus() {
      if (this.checkBoxList.length === 0) {
        return this.$message({
          message: '数据为空',
          type: 'warning'
        })
      }
      this.idList = this.checkBoxList.map(x => x.id)
      await changeStatus(2, this.idList.join())
        .then(() => {
          this.pageSearch()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
    },
    // 启用歌手
    async enableStatus() {
      if (this.checkBoxList.length === 0) {
        return this.$message({
          message: '数据为空',
          type: 'warning'
        })
      }
      this.idList = this.checkBoxList.map(x => x.id)
      await changeStatus(1, this.idList.join())
        .then(() => {
          this.pageSearch()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
    },
    // 查看选项
    async handleClick(id) {
      const { data } = await musicDetails(id)
      this.dialogForm = true
      this.$nextTick(() => {
        this.$refs.add.update(data)
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="table">
      <el-input
        v-model="page.name"
        placeholder="搜索音乐"
        clearable
      />
      <el-input
        v-model="page.singerName"
        placeholder="根据歌手搜索"
        clearable
      />
      <el-input
        v-model="page.albumName"
        placeholder="根据专辑搜索"
        clearable
      />
      <el-select v-model="page.status" placeholder="搜索状态">
        <el-option label="启用" value="1" />
        <el-option label="关闭" value="2" />
      </el-select>
      <!--      <el-select v-model="page.type" placeholder="搜索类型">-->
      <!--        <el-option label="男歌手" value="1" />-->
      <!--        <el-option label="女歌手" value="2" />-->
      <!--        <el-option label="团体" value="3" />-->
      <!--      </el-select>-->
      <!--      <el-select v-model="page.status" placeholder="搜索状态">-->
      <!--        <el-option label="启用" value="1" />-->
      <!--        <el-option label="关闭" value="2" />-->
      <!--      </el-select>-->
      <el-button class="left-btn" type="primary" @click="pageSearch">搜索</el-button>
      <el-button type="danger" plain @click="closeStatus">锁定</el-button>
      <el-button type="info" plain @click="enableStatus">启用</el-button>
      <el-button type="success" class="add" @click="dialogFormVisible = true">添加音乐</el-button>
      <el-dialog
        title="添加音乐"
        top="20px"
        width="900px"
        :visible.sync="dialogFormVisible"
        fullscreen
        :center="true"
        :destroy-on-close="true"
      >
        <MusicBlock :dialog-form-visible.sync="dialogFormVisible" />
      </el-dialog>
    </div>
    <el-table
      size="mini"
      style="width: 100%"
      height="500px"
      :data="tableData"
      :lazy="true"
      :highlight-current-row="true"
      @select="checkBoxList = $event"
      @select-all="checkBoxList = $event"
    >
      <el-table-column
        type="selection"
        width="50"
      />
      <el-table-column
        fixed
        sortable="true"
        prop="id"
        label="id"
        width="80"
      />
      <el-table-column
        fixed
        prop="name"
        label="音乐名称"
        width="200"
      />
      <el-table-column
        prop="albumName"
        label="唱片"
        width="150"
      >
<!--        <template slot-scope="scope">-->
<!--          <el-image :src="scope.row.avatar" :lazy="true" :preview-src-list="imgList" :height="70" />-->
<!--        </template>-->
      </el-table-column>
      <el-table-column
        prop="singerName"
        label="歌手"
        width="150"
      />
      <el-table-column
        prop="audio"
        label="音频"
        width="200"
      />
      <el-table-column
        prop="count"
        label="播放次数"
        width="100"
      />
      <el-table-column
        prop="createTime"
        label="发行时间"
        width="150"
      />
      <el-table-column
        prop="status"
        label="状态"
        width="50"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleClick(scope.row.id)">查看</el-button>
<!--          <el-button type="text" size="mini">编辑</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalNum"
      :page-size="page.pageSize"
      :hide-on-single-page="true"
      @current-change="pageChange"
    />
    <el-dialog
      title="修改音乐"
      :visible.sync="dialogForm"
      fullscreen
      :center="true"
      :destroy-on-close="true"
    >
      <MusicBlock ref="add" :dialog-form-visible.sync="dialogForm" />
    </el-dialog>
  </div>
</template>

<style scoped>
.table {
  display: flex;
  align-items: center;
  margin-top: 20px;
  .left-btn{
    margin-left: 20px;
  }
  .el-input {
    width: 200px;
    margin-left: 20px;
  }

  .add {
    margin-left: auto;
    margin-right: 20px;
  }

  .el-dialog {
    overflow: hidden;
  }
}
</style>
