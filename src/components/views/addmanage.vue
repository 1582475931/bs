<template>
  <div class="mongadd">
    <el-button type="primary" plain @click="add">添加</el-button>
    <el-dialog :title="!isB?'添加管理员':'修改管理员'" width="30%" :visible.sync="isA" :before-close="del">
      <div>
        <p class="p">账号</p>
        <el-input
          placeholder="请输入账号"
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
          show-password
          v-model="user.password"
          :disabled="isB"
        ></el-input>
      </div>
      <div v-if="!isB">
        <p class="p">确认密码</p>
        <el-input placeholder="确认密码" clearable class="input" show-password v-model="password"></el-input>
      </div>
      <div>
        <p class="p">姓名</p>
        <el-input placeholder="请输入姓名" clearable class="input" v-model="user.name" :disabled="isB"></el-input>
      </div>
      <div>
        <p class="p">性别</p>
        <el-radio v-model="user.sex" label="男" :disabled="isB">男</el-radio>
        <el-radio v-model="user.sex" label="女" :disabled="isB">女</el-radio>
      </div>
      <div>
        <p class="p">年龄</p>
        <el-input
          placeholder="请输入年龄"
          clearable
          class="input"
          type="number"
          v-model="user.age"
          :disabled="isB"
          :min="0"
          :max="100"
        ></el-input>
      </div>
      <div>
        <p class="p">描述</p>
        <el-input placeholder="请输入描述" clearable class="input" v-model="user.des"></el-input>
      </div>
      <div>
        <p class="p">时间</p>
        <el-date-picker type="date" placeholder="选择日期" class="input" v-model="user.time"></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!isB" @click="addT">添加</el-button>
        <el-button type="primary" v-else @click="addUpdate">修改</el-button>
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
      password: "",
      user: {
        username: "",
        password: "",
        time: "",
        sex: "",
        age: "",
        name: "",
        des: ""
      }
    };
  },
  methods: {
    //数据的清空
    empey() {
      this.password = "";
      this.user = {
        username: "",
        password: "",
        time: "",
        sex: "",
        age: "",
        name: "",
        des: ""
      };
    },
    //按条件查询
    find(id) {
      this.isA = !this.isA;
      this.isB = true;
      this.axios({
        method: "get",
        url: API.findManage,
        params: {
          id
        }
      }).then(res => {
        if (res.data.isok) {
          let data = res.data.data[0];
          data.time = time(data.time);
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
      if (this.password != this.user.password) {
        this.$message({
          message: "两次密码不同",
          type: "warning"
        });
        return;
      }
      if (this.user.age <= 0 || this.user.age >= 100) {
        this.$message({
          message: "年龄在0-100之间",
          type: "warning"
        });
        return;
      }
      if (this.user.name.length > 4) {
        this.$message({
          message: "姓名最大长度是4",
          type: "warning"
        });
        return;
      }
      if (this.user.time != "") {
        this.user.time = new Date(this.user.time).getTime();
      }

      this.axios({
        method: "post",
        url: API.addManage,
        data: this.user
      }).then(res => {
        this.init(res);
      });
    },
    //数据的更新
    addUpdate() {
      if (this.user.time != "") {
        this.user.time = new Date(this.user.time).getTime();
      }
      this.axios({
        method: "post",
        url: API.upManag,
        data: this.user
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

  >>>.el-dialog {
    width: 425px !important;
    border-radius 15px;
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