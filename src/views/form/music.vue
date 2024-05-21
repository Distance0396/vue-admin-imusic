<script>
import MusicBlock from '@/views/form/block/musicBlock.vue'
import { getPageMusic } from '@/api/music'
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
        album: ''
      },
      // 总数据条数
      totalNum: 0,
      // 控制添加歌手块显示的显示
      dialogFormVisible: false
    }
  },
  created: function() {
    this.pageSearch()
  },
  methods: {
    async pageSearch() {
      const { data } = await getPageMusic(this.page)
      // 总数据条
      this.totalNum = data.total
      // 接受返回的数据集
      this.tableData = data.page
    },
    watchFormVisible() {
      this.dialogFormVisible = false
    },
    // 点击分页触发
    pageChange(e) {
      this.page.page = e
      // this.pageSearch()
    },
    // 勾选行触发
    checkBox(e) {
      this.checkBoxList = e
    },
    // 勾选全部触发
    checkAllBox(e) {
      this.checkBoxList = e
    }
  }
}
</script>

<template>
  <div>
    <div class="table">
      <el-input
        v-model="page.name"
        placeholder="搜索歌手"
        clearable
      />
      <el-input
        v-model="page.album"
        placeholder="搜索专辑"
        clearable
      />
<!--      <el-select v-model="page.type" placeholder="搜索类型">-->
<!--        <el-option label="男歌手" value="1" />-->
<!--        <el-option label="女歌手" value="2" />-->
<!--        <el-option label="团体" value="3" />-->
<!--      </el-select>-->
<!--      <el-select v-model="page.status" placeholder="搜索状态">-->
<!--        <el-option label="启用" value="1" />-->
<!--        <el-option label="关闭" value="2" />-->
<!--      </el-select>-->
      <el-button type="primary" @click="pageSearch">搜索</el-button>
      <el-button type="danger" plain @click="closeStatus">锁定</el-button>
      <el-button type="info" plain @click="enableStatus">启用</el-button>
      <el-button type="success" class="add" @click="dialogFormVisible = true">添加音乐</el-button>
      <el-dialog
        title="添加音乐"
        :visible.sync="dialogFormVisible"
        top="20px"
        width="900px"
        :center="true"
        :destroy-on-close="true"
      >
        <MusicBlock @FormVisible="watchFormVisible" />
      </el-dialog>
    </div>
    <el-table
      size="mini"
      style="width: 100%"
      height="500px"
      :data="tableData"
      :lazy="true"
      :highlight-current-row="true"
      @select="checkBox"
      @select-all="checkAllBox"
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
        width="150"
      />
      <el-table-column
        prop="album"
        label="唱片"
        width="100"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" :lazy="true" :preview-src-list="imgList" :height="70" />
        </template>
      </el-table-column>
      <el-table-column
        prop="singer"
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
        width="120"
      />
      <el-table-column
        prop="createTime"
        label="发行时间"
        width="150"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleClick(scope.row.id)">查看</el-button>
          <el-button type="text" size="mini">编辑</el-button>
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
  </div>
</template>

<style scoped>
.table {
  display: flex;
  align-items: center;
  margin-top: 20px;

  .el-input {
    width: 200px;
    margin-left: 40px;
  }
  .el-input:nth-child(1){
    margin-right: 40px;
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
