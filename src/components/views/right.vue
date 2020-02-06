<template>
  <div class="right">
      <transition  name="el-fade-in">
    <router-view></router-view>
      </transition>
  </div>
</template>
<script>
export default {};
</script>
<style lang="stylus" scoped>
.right {
  flex: 1;
  height: 100%;
}
</style>