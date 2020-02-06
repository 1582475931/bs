<template>
  <div class="left">
    <!-- <router-link to="/index/manage" active-class="select">
      管理员管理
      <i class="iconfont icon-guanliyuan"></i>
    </router-link>
    <router-link to="/index/banner" active-class="select">
      banner管理
      <i class="iconfont icon-lunbotu"></i>
    </router-link>
       <router-link to="/index/type" active-class="select">
      类型管理
      <i class="iconfont icon-leixing"></i>
    </router-link>
    <router-link to="/index/wares" active-class="select">
      商品管理
      <i class="iconfont icon-iconsp2"></i>
    </router-link>
    <router-link to="/index/useradmin" active-class="select">
      店铺管理员
      <i class="iconfont icon-guanliyuan"></i>
    </router-link>
    <router-link to="/index/user" active-class="select">
      用户管理
      <i class="iconfont icon-yonghu"></i>
    </router-link>
    <router-link to="/index/updateManage" active-class="select">
      管理员修改密码
      <i class="iconfont icon-xiugaimima"></i>
    </router-link>
     <router-link to="/index/collection" active-class="select">
      用户收藏管理
      <i class="iconfont icon-shoucang"></i>
    </router-link>
      <router-link to="/index/buy" active-class="select">
      用户订单管理
      <i class="iconfont icon-dingdan"></i>
    </router-link>
     <router-link to="/index/point" active-class="select">
      商品点赞管理
      <i class="iconfont icon-dianzan"></i>
    </router-link>
     <router-link to="/index/cart" active-class="select">
      用户订加入购物车管理
   
    </router-link>
     <router-link to="/index/address" active-class="select">
      用户订收货地址管理

    </router-link> -->

    <!-- 设置权限 -->
      <router-link to="/index/manage" active-class="select" v-if='type==0'>
      管理员管理
      <i class="iconfont icon-guanliyuan"></i>
    </router-link>
    <router-link to="/index/banner" active-class="select" v-if='type==0||type==1'>
      banner管理
      <i class="iconfont icon-lunbotu"></i>
    </router-link>
       <router-link to="/index/type" active-class="select" v-if='type==0||type==1'>
      类型管理
      <i class="iconfont icon-leixing"></i>
    </router-link>
    <router-link to="/index/wares" active-class="select">
      商品管理
      <i class="iconfont icon-iconsp2"></i>
    </router-link>
    <router-link to="/index/useradmin" active-class="select" v-if='type==0||type==1'>
      店铺管理员
      <i class="iconfont icon-guanliyuan"></i>
    </router-link>
    <router-link to="/index/user" active-class="select" v-if='type==0||type==1'>
      用户管理
      <i class="iconfont icon-yonghu"></i>
    </router-link>
    <router-link to="/index/updateManage" active-class="select" v-if='type==1'>
      管理员修改密码
      <i class="iconfont icon-xiugaimima"></i>
    </router-link>
     <router-link to="/index/collection" active-class="select" v-if='type==0||type==1'>
      用户收藏管理
      <i class="iconfont icon-shoucang"></i>
    </router-link>
      <router-link to="/index/buy" active-class="select" v-if='type==0||type==1'>
      用户订单管理
      <i class="iconfont icon-dingdan"></i>
    </router-link>
     <router-link to="/index/point" active-class="select" v-if='type==0||type==1'>
      商品点赞管理
      <i class="iconfont icon-dianzan"></i>
    </router-link>
     <router-link to="/index/cart" active-class="select" v-if='type==0||type==1'>
      用户订加入购物车管理
   
    </router-link>
     <router-link to="/index/address" active-class="select" v-if='type==0||type==1'>
      用户收货地址管理

    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type:''
    }
  },
  mounted() {
    this.type=sessionStorage.getItem('type')
    console.log(this.type);
    
  },
};
</script>
    
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.left {
  width: 200px;
  height: 100%;
  background: colorLeft;

  a {
    display: block;
    position: relative;
    width: 200px;
    color: #ffffff;
    text-align: center;
    // margin: 10px 0;
    height: 50px;
    line-height: 50px;

    i {
      position: absolute;
      top: 0px;
      font-size: 22px;
      left: 15px;
    }
  }

  .select {
    background: color4;
  }
}
</style>