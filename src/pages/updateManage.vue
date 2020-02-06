<template>
  <div class="box">
    <div class="update">
      <h3>{{$route.name}}</h3>
      <div>
        <p>用户</p>
        <el-input placeholder="请输入内容" v-model="user.username" clearable class="input"></el-input>
      </div>
      <div>
        <p>原密码</p>
        <el-input placeholder="请输入原密码" v-model="user.oldpass" clearable class="input" show-password></el-input>
      </div>
      <div>
        <p>新密码</p>
        <el-input placeholder="请输入新密码" v-model="user.newpass" clearable class="input" show-password></el-input>
      </div>
      <div>
        <el-button type="primary" class="btn" @click="update">修改密码</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      user: {
        username: "",
        oldpass: "",
        newpass: ""
      }
    };
  },
  methods: {
    update() {
      this.axios({
        method: "post",
        url: API.changePassManage,
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.user.oldpass = "";
          this.user.newpass = "";
        } else {
          this.$message.error(res.data.info);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';

.box {
  background: #ccc;
  width: 100%;
  height: 100%;
  position: relative;

  .update {
    width: 350px;
    height: 350px;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;
    text-align: center;
    border-radius: 20px;

    h3 {
      font-size: 30px;
      color: mongSize;
      margin: 10px 0;
    }

    .btn {
      width: 300px;
      margin: 10px;
    }

    p {
      display: inline-block;
      width: 60px;
      color: #999;
    }

    .input {
      margin: 10px 0;
      width: 240px;
    }
  }
}
</style>