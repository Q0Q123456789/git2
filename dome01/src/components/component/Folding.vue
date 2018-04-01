<template>
    <div id="folding">
       <li class="" @click="onClick(1)">首页</li>
       <li @click="onClick(2)">查看</li>
       <li @click="onClick(3)">历史</li>
       <li @click="onClick(4)">进程</li>
       <li @click="onClick(5)">管理</li>
    </div>
</template>
<script>
export default {
  name: "Folding",
  props: ["list"],
  data() {
    return {

    };
  },
  mounted() {
    console.log(this.list);
  },
  methods: {
    onClick(i){
      console.log(i)
    }
  }
};
</script>
<style lang="less" scoped>
#folding{
  li{
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    background: #fff;
  }
  
}
</style>
