<template>
  <div class="manage">
    <h3>{{$route.name}}</h3>
    <template>
      <el-select v-model="value" placeholder="请选择" @change="add" class="input">
        <el-option label="全部" value></el-option>
        <el-option v-for="item in d" :key="item.id" :label="item.username" :value="item.id"></el-option>
      </el-select>
      <el-table :data="d.slice((curPage-1)*pagesize,curPage*pagesize)" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>

        <el-table-column prop="username" label="用户"></el-table-column>
        <el-table-column label="用户头像">
          <template slot-scope="scope">
            <img :src="scope.row.img?`http://localhost:3000${scope.row.img}`:''" alt class="pic" />
          </template>
        </el-table-column>

        <el-table-column prop="time" label="时间" width="150">
          <template slot-scope="scope">{{scope.row.time|time()}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <v-common :id="scope.row.id" @getDelete="getDelete" :isB="isB"></v-common>
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

export default {
  data() {
    return {
      pagesize: 5,
      curPage: 1,
      d: [],
      value: "",
      isB: false
    };
  },
  mounted() {
    this.find({});

  },
  methods: {
    //按条件查询
    add() {
      this.find({ id: this.value });
    },
    //删除
    getDelete(id) {
      this.axios({
        method: "get",
        url: API.deleteUser,
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
          if (num % 5 == 0) {
            this.curPage--;
          }
        }
      });
    },
    //查询的封装
    find(name) {
      this.axios({
        method: "get",
        url: API.findUser,
        params: name
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

  .pic {
    height: 50px;
    width: 200px;
  }

  .input {
    float: right;
    margin: 10px 60px;
    width: 240px;
  }
}
</style>