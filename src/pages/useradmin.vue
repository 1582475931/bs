<template>
  <div class="manage">
    <h3>{{$route.name}}</h3>
    <v-add ref="add" @getUpdate="find({})" @changeQ="changeQ"></v-add>
   
    <el-input v-model="input" placeholder="请输入用户或店铺名称" class="input" @input="cha"></el-input>
    <template>
      <el-table :data="d.slice((curPage-1)*pagesize,curPage*pagesize)" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="shop" label="店铺名称" width="150"></el-table-column>
        <el-table-column  label="图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.ava?`http://localhost:3000${scope.row.ava}`:''" alt class="pic" />
          </template>
        </el-table-column>
        <el-table-column prop="isA" label="是否同意注册" width="70"></el-table-column>
        <el-table-column prop="des" label="描述"></el-table-column>
        <el-table-column prop="time" label="时间" width="100">
          <template slot-scope="scope">{{scope.row.time|time()}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <v-common
              :id="scope.row.id"
              @getUpade="getUpade"
              @getDelete="getDelete"
              :isA="scope.row.isA"
            ></v-common>
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
import vAdd from "../components/views/adduseradmin";

export default {
  data() {
    return {
      pagesize: 3,
      curPage: 1,
      input: "",
      d: []
    };
  },
  components: {
    vAdd,

  },
  mounted() {
    this.find({});
  },
  methods: {
    //清空搜索框
    changeQ() {
      this.input='';
      this.find({});
    },
    //查看
    getUpade(id) {
      this.$refs.add.find(id);
    },
    //删除
    getDelete(id) {
      this.axios({
        method: "get",
        url: API.deleteUseradmin,
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
          if (num % 3 == 0) {
            this.curPage--;
          }
        }
      });
    },
    //查询的封装
    find(name) {
      this.axios({
        method: "get",
        url: API.findUseradmin,
        params: name
      }).then(res => {
        if (res.data.isok) {
          this.d = res.data.data;
        }
      });
    },
    //按条件查询
    cha() {
      this.find({
        username: this.input
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

  h3 {
    font-size: 40px;
    color: mongSize;
    line-height: 60px;
    margin-left: 60px;
  }

  .input {
    float: right;
    margin: 10px 60px;
    width: 240px;
  }

  .btn {
    margin: 10px 60px;
  }

  .pic {
    height: 50px;
    width: 100px;
  }

  .el-table {
    width: 90% !important;
    margin: 10px auto;
  }

  .el-pagination {
    text-align: center;
  }
}
</style>