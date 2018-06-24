<template>
  <div id='boos'>
      <el-row :gutter="20" >
        <el-col :span="6" v-for="item in imgUrl" :key="item.id" >
          <div class="grid-content bg-purple">
            <img v-bind:src="'http://127.0.0.1:3000/'+item.path" :alt="item.name">
          </div>
        </el-col>
      </el-row>
  </div>
</template>
<script>
export default {
  name: "boos",
  data() {
    return {
      imgUrl:[]
    };
  },
  components: {},
  mounted() {
    this.ajax()
  },
  methods: {
    ajax(){
      this.$get("a").then(res=>{
        console.log(res)
        this.imgUrl = res.data;
        console.log(this.imgUrl)
      })
    }
  }
};
</script>
<style lang='less' >
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>