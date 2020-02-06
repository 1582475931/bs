<template>
  <div class="mongadd">
    <el-button type="primary" plain @click="add" :disabled="type==0||type==1">添加</el-button>
    <el-dialog :title="!isB?'添加普通用户':'修改普通用户'" width="30%" :visible.sync="isA" :before-close="del">
      <div>
        <p class="p">商品名称</p>
        <el-input placeholder="请输入商品名称" clearable class="input" v-model="user.name"></el-input>
      </div>
      <div>
        <p class="p">类型</p>
        <el-select v-model="user.type" clearable placeholder="请选择" class="input">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
       <div>
        <p class="p">颜色</p>
        <el-select v-model="user.color" clearable placeholder="请选择" class="input">
          <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <p class="p">价格</p>
        <el-input placeholder="请输入价格" clearable class="input" v-model="user.price"></el-input>
      </div>
      <div>
        <p class="p">库存</p>
        <el-input placeholder="请输入库存" clearable class="input" v-model="user.num"></el-input>
      </div>
      <div>
        <p class="p">联系方式</p>
        <el-input placeholder="请输入联系方式" clearable class="input" v-model="user.tel"></el-input>
      </div>
       <div>
        <p class="p">地址</p>
        <el-input placeholder="请输入地址" clearable class="input" v-model="user.address"></el-input>
      </div>
      <div>
        <p class="p">描述</p>
        <el-input placeholder="请输入描述" clearable class="input" v-model="user.des"></el-input>
      </div>
      <div>
        <p class="p">时间</p>
        <el-date-picker type="date" placeholder="选择日期" class="input" v-model="user.time"></el-date-picker>
      </div>
      <div class="file">
        <p class="p">图片</p>
        <img :src="user.img?user.img:''" alt class="pic" />

        <input type="file" @change="change($event)" />
        <i class="el-icon-plus"></i>
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
    props:['type'],
  data() {
    return {
      isA: false,
      isB: true,
      options: [
        {
          value: "男装",
          label: "男装"
        },
        {
          value: "女装",
          label: "女装"
        },
         {
          value: "裙子",
          label: "裙子"
        },
        {
          value: "食品",
          label: "食品"
        }, {
          value: "手机",
          label: "手机"
        },
        {
          value: "书",
          label: "书"
        }, {
          value: "鞋子",
          label: "鞋子"
        },
        {
          value: "裤子",
          label: "裤子"
        }
      ],
      option:[
        {
          value:'红色',
          label:'红色',
        },
        {
          value:'蓝色',
          label:'蓝色',
        },{
          value:'黑色',
          label:'黑色',
        },{
          value:'白色',
          label:'白色',
        }
      ],
      username: "",
      shop: "",
      user: {
        type: "",
        num: "",
        name: "",
        price: "",
        tel: "",
        des: "",
        time: "",
        img: "",
        address:'',
        color:''
      },
      tite: "http://localhost:3000",
      file: ""
    };
  },
  mounted() {
    this.username = sessionStorage.getItem("username");
    this.shop = sessionStorage.getItem("shop");
  },
  methods: {
    //数据的清空
    empey() {
      this.user = {
        type: "",
        name: "",
        price: "",
        tel: "",
        des: "",
        time: "",
        img: "",
        num: "",
        address:'',
        color:''
      };
    },
    //按条件查询
    find(id) {
      this.isA = !this.isA;
      this.isB = true;
      this.axios({
        method: "get",
        url: API.findWares,
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
      // this.$emit("changeQ");
    },

    //数据的添加
    addT() {
      if (this.user.time != "") {
        this.user.time = new Date(this.user.time).getTime();
      }
      var params = new FormData();
      params.append("file", this.file);
      params.append("username", this.username);
      params.append("type", this.user.type);
      params.append("name", this.user.name);
      params.append("price", this.user.price);
      params.append("tel", this.user.tel);
      params.append("time", this.user.time);
      params.append("des", this.user.des);
      params.append("num", this.user.num);
       params.append("address", this.user.address);
         params.append("color", this.user.color);
      this.axios({
        method: "post",
        url: API.addWares,
        data: params
      }).then(res => {
           this.file = "";
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
      var params = new FormData();
      params.append("file", this.file);
      params.append("id", this.user.id);
      params.append("type", this.user.type);
      params.append("name", this.user.name);
      params.append("price", this.user.price);
      params.append("tel", this.user.tel);
      params.append("time", this.user.time);
      params.append("des", this.user.des);
      params.append("num", this.user.num);
      this.axios({
        method: "post",
        url: API.updatedWare,
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