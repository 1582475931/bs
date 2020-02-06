<template>
  <div class="index" @click="clicked">
    <v-head></v-head>
    <v-main></v-main>
  </div>
</template>
<script>
import vHead from "../components/views/head";
import vMain from "../components/views/main";
export default {
  data() {
    return {
      lTime: new Date().getTime(), // 最后一次点击的时间
      cTime: new Date().getTime(), //当前时间
      // tOut: 60 * 10 * 1000,   //超时时间10min
      tOut: 10 * 1000,
      t1: ""
    };
  },
  mounted() {
    // this.t1 = setInterval(this.tTime, 1000);
  },
  methods: {
    clicked() {
      this.lTime = new Date().getTime(); //当界面被点击更新点击时间
    },
    tTime() {
      this.cTime = new Date().getTime();
      // 用最后一次点击时间-点击更新时间>设置的时间
      if (this.cTime - this.lTime > this.tOut) {
        //未登录状态
        if (sessionStorage.getItem("username") == undefined) {
          this.lTime = new Date().getTime();
        } else {
          // 清定时器，防止内存泄漏
          clearInterval(this.t1);
          //重定向到login页面
          this.$router.replace("/login");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("type");
          this.$alert("登录超时，请重新登录", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.$message({
                type: "info",
                message: "退出登录"
              });
            }
          });
        }
      }
    }
  },
  components: {
    vHead,
    vMain
  }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';

.index {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>