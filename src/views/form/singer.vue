<script>
import Singer from '@/views/form/block/singerBlock.vue'
import { changeStatus, getPageSinger } from '@/api/singer'

export default {
  components: {
    Singer
  },
  data() {
    return {
      // 接受返回的数据集
      tableData: [],
      // 勾选歌手行数组
      checkBoxList: [],
      // 勾选歌手行id数组
      idList: '',
      // 分页搜索对象
      page: {
        page: 1,
        pageSize: 8,
        status: undefined,
        name: '',
        // 搜索类型
        type: undefined
      },
      // 总数据条数
      totalNum: 0,
      // 控制添加歌手块显示的显示
      dialogFormVisible: false,
      // 大图数组
      imgList: []
    }
  },
  created() {
    this.pageSearch()
  },
  methods: {
    // 查看歌手信息按钮
    handleClick(row) {
      console.log(row)
    },
    // 像后端发送分页请求
    async pageSearch() {
      const { data } = await getPageSinger(this.page)
      // 总数据条
      this.totalNum = data.total
      // 接受返回的数据集
      this.tableData = data.page
      // 将返回的头像数据遍历出来放入大图数组中
      data.page.forEach(x => {
        this.imgList.push(x.avatar)
      })
      this.page.type = undefined
      this.page.name = undefined
      this.page.status = undefined
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
        .then(res => {
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
        .then(res => {
          this.pageSearch()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
    },
    // 歌手添加触发
    watchFormVisible() {
      this.dialogFormVisible = false
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },
    // 点击分页触发
    pageChange(e) {
      this.page.page = e
      this.pageSearch()
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
      <el-select v-model="page.type" placeholder="搜索类型">
        <el-option label="男歌手" value="1"/>
        <el-option label="女歌手" value="2"/>
        <el-option label="团体" value="3"/>
      </el-select>
      <el-select v-model="page.status" placeholder="搜索状态">
        <el-option label="启用" value="1"/>
        <el-option label="关闭" value="2"/>
      </el-select>
      <el-button type="primary" @click="pageSearch">搜索</el-button>
      <el-button type="danger" plain @click="closeStatus">锁定</el-button>
      <el-button type="info" plain @click="enableStatus">启用</el-button>
      <el-button type="success" class="add" @click="dialogFormVisible = true">添加歌手</el-button>
      <el-dialog
        title="添加歌手"
        :visible.sync="dialogFormVisible"
        top="20px"
        width="900px"
        :center="true"
        :destroy-on-close="true">
        <Singer @FormVisible="watchFormVisible" />
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
        width="55"
      />
      <el-table-column
        fixed
        sortable="true"
        prop="id"
        label="id"
        width="100"
      />
      <el-table-column
        fixed
        prop="name"
        label="歌手"
        width="120"
      />
      <el-table-column
        prop="avatar"
        label="头像"
        width="100"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" :lazy="true" :preview-src-list="imgList" :height="70"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型(1.男2.女3.团体)"
        width="150"
      />
      <el-table-column
        prop="description"
        label="描述"
        width="300"
      />
      <el-table-column
        prop="status"
        label="状态(1.启用2.锁定)"
        width="120"
      />
      <el-table-column
        prop="createTime"
        label="入站时间"
        width="150"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id)" type="text" size="mini">查看</el-button>
          <el-button type="text" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalNum"
      :page-size="page.pageSize"
      @current-change="pageChange"
      :hide-on-single-page="true"
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
