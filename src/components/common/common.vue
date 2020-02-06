<template>
  <div>
    <el-button size="mini" @click="handleEdit()" :disabled="isA=='同意'||isB==false||type==0||type==1" >编辑</el-button>
    <el-button size="mini" type="danger" @click="handleDelete()" :disabled="type==0||type==1">删除</el-button>
  </div>
</template>
<script>
export default {
  props: ["id",'isA','isB','type'],
  methods: {
    handleEdit() {
      this.$emit("getUpade", this.id);
    },
    handleDelete() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("getDelete", this.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="stylus" scoped></style>