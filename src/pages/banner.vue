<template>
  <div class="manage">
    <h3>{{$route.name}}</h3>
    <v-add ref="add" @getUpdate="find()"></v-add>

    <template>
      <el-table :data="d.slice((curPage-1)*pagesize,curPage*pagesize)" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="time" label="图片"  >
          <template slot-scope="scope">
            <img :src="scope.row.img?`http://localhost:3000${scope.row.img}`:''" alt  class="pic"/>
          </template>
        </el-table-column>

        <el-table-column prop="des" label="描述"></el-table-column>
        <el-table-column prop="time" label="时间" width="100">
          <template slot-scope="scope">{{scope.row.time|time()}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <v-common :id="scope.row.id" @getUpade="getUpade" @getDelete="getDelete"></v-common>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      @current-change="handleCurrentChange"
      :page-size="pagesize"
      :total="d.length"
    ></el-pagination>
  </div>
</template>

 
<script>
import API from "../common/js/API";
import vAdd from "../components/views/addbanner";
export default {
  data() {
    return {
      pagesize: 2,
      curPage: 1,

      d: []
    };
  },
  components: {
    vAdd
  },
  mounted() {
    this.find();
  },
  methods: {
    //查看
    getUpade(id) {
      this.$refs.add.find(id);
    },
    //删除
    getDelete(id) {
    
      this.axios({
        method: "get",
        url: API.delBanner,
        params: {
          id
        }
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          var num = this.d.length;
          num--;
          this.find({});
          if (this.curPage == 1) {
            return;
          }
          if (num % 2 == 0) {
            this.curPage--;
          }
        }
      });
    },
    //查询的封装
    find() {
      this.axios({
        method: "get",
        url: API.findBanner
      }).then(res => {
        if (res.data.isok) {
          this.d = res.data.data;
        }
      });
    },

    //分页
    handleCurrentChange(val) {
      this.curPage = val;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';

.manage {
  margin-left: 20px;
  height: 100%;
flex 1;
  h3 {
    font-size: 40px;
    color: mongSize;
    line-height: 60px;
    margin-left: 60px;
  }

  .btn {
    margin: 10px 60px;
  }

  .el-table {
    width: 90% !important;
    margin: 10px auto;
  }

  .el-pagination {
    text-align: center;
  }
  .pic{
    height 50px;
    width 200px;
  }
}
</style>