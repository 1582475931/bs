<template>
  <div class="mongadd">
    <el-button type="primary" plain @click="add">添加</el-button>
    <el-dialog :title="!isB?'添加普通用户':'修改普通用户'" width="30%" :visible.sync="isA" :before-close="del">
      <div>
        <p class="p">用户名</p>
        <el-input
          placeholder="请输入用户名"
          clearable
          class="input"
          v-model="user.username"
          :disabled="isB"
        ></el-input>
      </div>
      <div>
        <p class="p">密码</p>
        <el-input
          placeholder="请输入密码"
          clearable
          class="input"
          v-model="user.password"
            show-password
          :disabled="isB"
        ></el-input>
      </div>
      <div>
        <p class="p">姓名</p>
        <el-input placeholder="请输入姓名" clearable class="input" v-model="user.name" :disabled="isB"></el-input>
      </div>
      <div>
        <p class="p">店铺名称</p>
        <el-input placeholder="请输入店铺名称" clearable class="input" v-model="user.shop" :disabled="isB"></el-input>
      </div>
      <div v-if="user.id">
        <p class="p">是否同意</p>
        <el-radio v-model="user.isA" label="未同意">未同意</el-radio>
        <el-radio v-model="user.isA" label="同意">同意</el-radio>
      </div>
      <div>
        <p class="p">描述</p>
        <el-input placeholder="请输入描述" clearable class="input" v-model="user.des" :disabled="isB"></el-input>
      </div>
      <div>
        <p class="p">时间</p>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          class="input"
          v-model="user.time"
          :disabled="isB"
        ></el-date-picker>
      </div>
      <div class="file">
        <p class="p">图片</p>
        <img :src="user.ava?user.ava:''" alt class="pic" />

        <input type="file" @change="change($event)" :disabled="isB" />
        <i class="el-icon-plus"></i>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!isB" @click="addT">添加</el-button>
        <el-button type="primary" v-else @click="addUpdate" >修改</el-button>
        <el-button @click="del">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "../../common/js/API";
import time from "../../filter/time";
export default {
  data() {
    return {
      isA: false,
      isB: true,
      user: {
        username: "",
        password: "",
        name: "",
        shop: "",
        ava: "",
        des: "",
        time: ""
      },
      tite: "http://localhost:3000",
      file: ""
    };
  },
  methods: {
    //数据的清空
    empey() {
      this.user = {
        username: "",
        password: "",
        name: "",
        shop: "",
        ava: "",
        des: "",
        time: ""
      };
    },
    //按条件查询
    find(id) {
      this.isA = !this.isA;
      this.isB = true;
      this.axios({
        method: "get",
        url: API.findUseradmin,
        params: {
          id
        }
      }).then(res => {
        if (res.data.isok) {
          let data = res.data.data[0];
          data.time = time(data.time);
          data.ava = this.tite + data.ava;
          this.user = data;
        }
      });
    },
    //axios的成功的封装
    init(res) {
      if (res.data.isok) {
        this.$message({
          message: res.data.info,
          type: "success"
        });
        this.empey();
        // this.file = "";
        this.isA = false;
        this.$emit("getUpdate");
      } else {
        this.$message({
          message: res.data.info,
          type: "warning"
        });
      }
    },
    add() {
      this.isA = !this.isA;
      this.isB = false;
       this.$emit('changeQ')
    },

    //数据的添加
    addT() {
      if (this.user.time != "") {
        this.user.time = new Date(this.user.time).getTime();
      }

      var params = new FormData();
      params.append("file", this.file);
      params.append("username", this.user.username);
      params.append("password", this.user.password);
      params.append("name", this.user.name);
      params.append("shop", this.user.shop);
      params.append("time", this.user.time);

      params.append("des", this.user.des);
      this.axios({
        method: "post",
        url: API.addUseradmin,
        data: params
      }).then(res => {
        this.init(res);
      });
    },
    change(e) {
      this.file = e.target.files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = e => {
        this.user.ava = e.target.result;
      };
    },

    //数据的更新
    addUpdate() {
      if (this.user.time != "") {
        this.user.time = new Date(this.user.time).getTime();
      }
      if (!this.file) {
          this.user.ava=this.user.ava.substring(21,this.user.ava.length)
        this.file = this.user.ava;
      }
      var params = new FormData();
      params.append("file", this.file);
      params.append("username", this.user.username);
      params.append("password", this.user.password);
      params.append("name", this.user.name);
      params.append("shop", this.user.shop);
      params.append("time", this.user.time);
      params.append("des", this.user.des);
      params.append("isA", this.user.isA);

      this.axios({
        method: "post",
        url: API.updatedUseradmin,
        data: params
      }).then(res => {
        this.init(res);
      });
    },
    //取消
    del() {
      this.isA = false;
      if (this.user.id) {
        this.empey();
      }
      this.$message("已取消");
    }
  }
};
</script>
<style lang="stylus" scoped>
.mongadd {
  display: inline-block;
  margin: 10px 60px;

  .pic {
    position: absolute;
    width: 100px;
    height: 100px;
    display: inline-block;
    border: 1px dashed #8c939d;
    border-radius: 10px;
  }

  .file:hover>.pic {
    border: 1px dashed #1E90FF;
  }

  .file {
    position: relative;
    margin-bottom: 50px;
  }

  .file>p {
    margin-top: 50px;
  }

  .file>i {
    margin: 0 24px;
    font-size: 50px;
    color: #1E90FF;
  }

  .file>input {
    position: absolute;
    width: 100px;
    height: 100px;
    opacity: 0;
  }

  >>>.el-dialog {
    width: 425px !important;
    border-radius: 15px;
  }

  >>>.el-dialog__title {
    color: #ff8247;
    font-size: 30px;
  }

  .p {
    display: inline-block;
    width: 70px;
    font-size: 16px;
  }

  .input {
    width: 300px;
    height: 40px;
    margin: 5px 0;
  }
}
</style>