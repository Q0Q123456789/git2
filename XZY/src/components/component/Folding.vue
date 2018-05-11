<template>
    <div id="folding">
       <!-- <li class="" @click="onClick(1)">首页</li>
       <li @click="onClick(2)">查看</li>
       <li @click="onClick(3)">历史</li>
       <li @click="onClick(4)">进程</li>
       <li @click="onClick(5)">管理</li> -->
       <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>
<script>
export default {
  name: "Folding",
  props: ["list"],
  data() {
    return {
      data:[],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    // this.domain();
  },
  methods: {
    onClick(i) {
      console.log(i);
    }, 
    domain: function() {
      var vue = this;
      vue.$post("cities").then(res => {
        $.map(res.data,function(res,i){
          vue.data = res.cities
        })
      });
    },
    handleNodeClick(data) {
      this.$emit("changeState",data)
    }
  }
};
</script>
<style lang="less" scoped>
#folding {
  li {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
}
</style>
