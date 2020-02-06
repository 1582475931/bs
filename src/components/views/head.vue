<template>
  <div class="head">
    <h3>商城管理系统</h3>
    <div class="right_bd">
      <el-dropdown class="user-name" trigger="click" @command="tui">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="right">
      <img :src="img?`${img}`:''" alt />
      <input type="file" @change="update($event)" :disabled="type==0"/>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
  data() {
    return {
      img: "",
      file: "",
      tite: "http://localhost:3000",
      username: "",
      type:''
    };
  },
  mounted() {
    this.username = sessionStorage.getItem("username");
    this.type = sessionStorage.getItem("type");
    if (this.type == 1) {
      this.init(API.findManage, this.username);
      return;
    }
    if (this.type == 2) {
      this.init(API.findUseradmin, this.username);
    }
  },

  methods: {
    tui() {
      this.$confirm("此操作退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: API.exit
          }).then(res => {
            if (res.data.isok) {
              sessionStorage.clear();
              this.$message({
                message: res.data.info,
                type: "success"
              });
              sessionStorage.removeItem('type')
              sessionStorage.removeItem('username')
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出登录"
          });
        });
    },

    //更新头像
    update(e) {
      if (this.type == 1) {
      this.find(e, API.updatedManag);
      return;
    }
    if (this.type == 2) {
      this.find(e, API.udUseradmin);
    }
      //  
    },
    find(e, api) {
      console.log(e,API);
      
      this.file = e.target.files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = e => {
        this.img = e.target.result;
      };
      var params = new FormData();
      params.append("file", this.file);
      params.append("username", this.username);
      this.axios({
        url: api,
        method: "post",
        data: params
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
    //封装按条件查询和不同接口的使用
    init(api, name) {
      this.axios({
        method: "get",
        url: api,
        params: {
          username: name
        }
      }).then(res => {
        if (res.data.isok && res.data.data != 0) {
          this.img = this.tite + res.data.data[0].img;
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.head {
  width: 100%;
  height: 100px;
  background: color3;
  text-align center;
  h3{
    display inline-block;
    color #fff;
    line-height 100px;
    font-size 50px;
  }
}

.el-dropdown-menu {
  top: 60px !important;
  // left 671px!important;
}

.right {
  float: right;
  height 100%;
  margin-right: 80px;
  position: relative;
}

.right input {
  position: absolute;
  top: 10px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: 0;
}

.right span {
  height: 100px;
  color: #fff;
  text-align: center;
  font-size: 25px;
  margin: 0 20px 0 100px;
  line-height: 100px;
}

.right img {
  position: absolute;
  top: 10px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #fff;
}

.right:hover>img {
  border: 2px solid #409EFF;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}

.right_bd {
  float: right;
  line-height: 100px;
  margin-right: 100px;
}
</style>