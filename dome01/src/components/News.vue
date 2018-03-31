<template>
  <div id="main">
 
  </div>
</template>
<script>
export default {
  name: "News",
  props: ["msg"],
  data() {
    return {
      data: [

      ]
    };
  },
  mounted() {
    // this.drawLine();
    this.initpost()
  },
  methods: {
    initpost(){
      this.$post("activity").then(res => {
        console.log(res);
        this.list = res.data;
      })
    }
  }
};
</script>
<style scoped>
#main {
  width: 100%;
  height: 500px;
  border: 1px solid #000;
  background: #fff;
}
</style>
