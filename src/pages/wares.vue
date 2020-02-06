<template>
  <div class="manage">
    <h3>{{activeName}}</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品管理" name="商品管理"></el-tab-pane>
      <el-tab-pane label="商品评论管理" name="商品评论管理"></el-tab-pane>
      <el-tab-pane label="修改密码" name="修改密码" :disabled="type!=2"></el-tab-pane>
    </el-tabs>
    <v-update v-if="isA==2"></v-update>
    <v-add ref="add" @getUpdate="find({username})" @changeQ="changeQ" v-if="isA==0" :type="type"></v-add>
    <el-input
      v-model="input"
      placeholder="请输入用户或店铺名称"
      class="input"
      @input="cha"
      v-if="isA==0"
      :disabled="type==2"
    ></el-input>
    <el-select v-model="value" placeholder="请选择" @change="add1" v-show="isA==1" class="input">
      <el-option label="全部" value></el-option>
      <el-option v-for="item in d1" :key="item.id" :label="item.name" :value="item.waterId"></el-option>
    </el-select>
    <template>
      <el-table
        :data="d.slice((curPage-1)*pagesize,curPage*pagesize)"
        border
        style="width: 100%"
        v-show="isA==0"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="150"></el-table-column>
        <el-table-column prop="type" label="类型" width="60"></el-table-column>
         <el-table-column prop="num" label="库存" width="70"></el-table-column>
        <el-table-column prop="time" label="图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img?`http://localhost:3000${scope.row.img}`:''" alt class="pic" />
          </template>
        </el-table-column>
        <el-table-column prop="score" label="评分" width="70"></el-table-column>
        <el-table-column prop="price" label="价格" width="70"></el-table-column>
        <el-table-column prop="des" label="描述"></el-table-column>
        <el-table-column prop="time" label="时间" width="100">
          <template slot-scope="scope">{{scope.row.time|time()}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <v-common :id="scope.row.id" @getUpade="getUpade" @getDelete="getDelete" :type="type"></v-common>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :total="d.length"
        v-show="isA==0"
      ></el-pagination>

      <el-table
        :data="d1.slice((curPage-1)*pagesize,curPage*pagesize)"
        border
        style="width: 100%"
        v-show="isA==1"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="name" label="用户名称" width="150"></el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <el-table-column prop="score" label="评分" width="150"></el-table-column>
        <el-table-column prop="time" label="时间" width="150">
          <template slot-scope="scope">{{scope.row.time|time()}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <v-common :id="scope.row.id" @getDelete="getDelete1" :isB="isB"></v-common>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next,jumper"
        @current-change="handleCurrentChange1"
        :page-size="pagesize"
        :total="d1.length"
        v-show="isA==1"
      ></el-pagination>
    </template>
  </div>
</template>

 
<script>
import API from "../common/js/API";
import vAdd from "../components/views/addwares";
import vUpdate from "../components/views/updateUser";
export default {
  data() {
    return {
      isA: 0,
      isB: false,
      pagesize: 3,
      curPage: 1,
      input: "",
      d: [],
      d1: [],
      value: "",
      activeName: "商品管理",
      type: "",
      username: ""
    };
  },
  components: {
    vAdd,
    vUpdate
  },
  mounted() {
    this.name = this.$route.name;
    this.username = sessionStorage.getItem("username");
    this.type = sessionStorage.getItem("type");
    if (this.type != 2) {
      this.find1({});
      return;
    }
    this.find({
      username: this.username
    });
  },
  methods: {
    handleClick() {
      switch (this.activeName) {
        case "商品管理":
          this.isA = 0;
          find({});
          break;
        case "商品评论管理":
          this.isA = 1;
          this.init({});
          break;
        case "修改密码":
          this.isA = 2;
          break;
      }
    },
    add1() {
      this.init({
        waterId: this.value
      });
    },
    //清空搜索框
    changeQ() {
      this.input = "";
      this.find({});
    },
    //查看
    getUpade(id) {
      this.$refs.add.find(id);
    },
    getDelete(id) {
      this.del(id, API.deleteWares, this.d.length);
    },
    getDelete1(id) {
      this.del(id, API.deleteComment, this.d1.length);
    },
    //删除
    del(id, api, a) {
      this.axios({
        method: "get",
        url: api,
        params: {
          id
        }
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          var num = a;
          num--;
          if (this.type == 2) {
            this.find({
              username: this.username
            });
          } else {
            this.find1()
          }

          this.init({});
          if (this.curPage == 1) {
            return;
          }
          if (num % 3 == 0) {
            this.curPage--;
          }
        }
      });
    },
    find1(name) {
      this.axios({
        method: "get",
        url: API.findWares,
        params: name
      }).then(res => {
        if (res.data.isok) {
          this.d = res.data.data;
        }
      });
    },

    //查询的封装
    find(name) {
      this.axios({
        method: "get",
        url: API.finWares,
        params: name
      }).then(res => {
        if (res.data.isok) {
          this.d = res.data.data;
        }
      });
    },

    init(waterId) {
      this.axios({
        method: "get",
        url: API.findComment,
        params: waterId
      }).then(res => {
        if (res.data.isok) {
          this.d1 = res.data.data;
        }
      });
    },
    //按条件查询
    cha() {
      this.find1({
        name: this.input
      });
    },
    //分页
    handleCurrentChange(val) {
      this.curPage = val;
    },
    //分页
    handleCurrentChange1(val) {
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

  .el-tabs {
    width: 90%;
    margin: 0 60px;
  }

  .el-pagination {
    text-align: center;
  }
}
</style>