<template>
  <div class="mongadd">
    <el-button type="primary" plain @click="add">添加</el-button>
    <el-dialog
      :title="!isB?'添加banner':'修改banner'"
      width="30%"
      :visible.sync="isA"
      :before-close="del"
    >
      <div class="file">
        <p class="p">图片</p>
        <img :src="user.img?user.img:''" alt class="pic" />

        <input type="file" @change="change($event)" />
        <i class="el-icon-plus"></i>
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
        img: "",
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
        img: "",
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
        url: API.findBanner,
        params: {
          id
        }
      }).then(res => {
        if (res.data.isok) {
          let data = res.data.data[0];
          data.time = time(data.time);
          data.img = this.tite + data.img;
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
        this.file='';
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
    },

    //数据的添加
    addT() {
      if (this.user.time != "") {
        this.user.time = new Date(this.user.time).getTime();
      }
      var params = new FormData();
      params.append("file", this.file);
      params.append("time", this.user.time);
      params.append("des", this.user.des);
      this.axios({
        method: "post",
        url: API.addBanner,
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
        this.user.img = e.target.result;
      };
    },

    //数据的更新
    addUpdate() {
      if (this.user.time != "") {
        this.user.time = new Date(this.user.time).getTime();
      }

      if (!this.file) {
        this.user.img = this.user.img.substring(21, this.user.img.length);
        this.file = this.user.img;
      }
      console.log(this.user);

      var params = new FormData();
      params.append("file", this.file);
      params.append("id", this.user.id);
      params.append("time", this.user.time);
      params.append("des", this.user.des);
      this.axios({
        method: "post",
        url: API.updatedBanner,
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
    width: 50px;
    font-size: 16px;
  }

  .input {
    width: 300px;
    height: 40px;
    margin: 5px 0;
  }
}
</style>