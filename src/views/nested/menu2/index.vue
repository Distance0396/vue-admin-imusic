<script>
import Singer from '@/views/form/singer.vue'
import { getPageSinger } from '@/api/Singer'

export default {
  components: {
    Singer
  },
  data() {
    return {
      // 接受返回的数据集
      tableData: [],
      // 分页搜索对象
      pageDto: {
        page: 1,
        pageSize: 10,
        status: undefined,
        name: '',
        type: undefined
      },
      search: '',
      // 总数据条
      totalNum: 10,
      // 搜索类型
      type: null,
      // 控制点击添加歌手显示
      dialogFormVisible: false,
      imgList: []
    }
  },
  created() {
    this.pageSearch()
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    // 像后端发送分页请求
    async pageSearch() {
      const { data } = await getPageSinger(this.pageDto)
      // 总数据条
      this.totalNum = data.total
      // 接受返回的数据集
      this.tableData = data.page
      // 将返回的头像数据遍历出来放入大图数组中
      data.page.forEach(x => {
        this.imgList.push(x.avatar)
      })
      this.pageDto.type = undefined
      this.pageDto.name = undefined
      this.pageDto.status = undefined
    }
  }
}
</script>
<template>
  <div>
    <div class="table">
      <el-input
        v-model="pageDto.name"
        placeholder="搜索歌手"
        clearable
      />
      <el-select v-model="pageDto.type" placeholder="搜索类型">
        <el-option label="男歌手" value="1"/>
        <el-option label="女歌手" value="2"/>
        <el-option label="团体" value="3"/>
      </el-select>
      <el-select v-model="pageDto.status" placeholder="搜索状态">
        <el-option label="启用" value="1"/>
        <el-option label="关闭" value="2"/>
      </el-select>
      <el-button type="primary" @click="pageSearch">搜索</el-button>
      <el-button type="danger" @click="pageSearch">锁定</el-button>
      <el-button type="success" class="add" @click="dialogFormVisible = true">添加歌手</el-button>
      <el-dialog
        title="添加歌手"
        :visible.sync="dialogFormVisible"
        top="20px"
        width="900px"
        :center="true"
        :destroy-on-close="true">
        <Singer @FormVisible="dialogFormVisible = false" />
      </el-dialog>
    </div>
    <el-table
      size="mini"
      height="500"
      :data="tableData"
      style="width: 100%"
      :highlight-current-row="true"
      :default-sort = "{prop: 'id', order: 'ascending'}"
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
        width="200"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" :preview-src-list="imgList" :min-width="70" :height="70"/>
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
          <el-button @click="handleClick(scope.row.name)" type="text" size="mini">查看</el-button>
          <el-button type="text" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalNum"
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
