<template>
  <div class="update">
    <h3>修改密码</h3>
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
</template>
<script>
import API from "../../common/js/API";
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
        url: API.changePassUseradmin,
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
@import '../../common/stylus/index.styl';

.update {
  width: 350px;
  height: 350px;
  background: #fff;
  text-align: center;
  border-radius: 20px;
  margin: 10px auto;
  border: 1px solid #ccc;

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
</style>