<template>
  <div id="app">
      <el-container>
        <el-header><span class="img_logo" @click="getXlsFromTbl('app','main')"></span></el-header>
        <el-container>
          <el-aside width="200px">
            <v-folding :list='list' v-on:changeState="changeState" ></v-folding>
          </el-aside>
          <el-main>
            <v-news :msg='msg'></v-news>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>
<script>
import $ from "zepto-webpack";
import Folding from "./component/Folding.vue";
import News from "./News.vue";
import Home from "./Home.vue";
// import Ajax from '../public/ajax.js'
export default {
  name: "Header",
  data() {
    return {
      list: [],
      msg:''
    };
  },
  components: {
    "v-folding": Folding,
    "v-news": News,
    "v-home": Home
  },
  mounted() {
    // this.getData();
  },
  methods: {
    getData() {
      this.$get("b").then(res => {
        this.list = res.data;
        this.put();
      })
    },
    put(){
      var params={
          list:'adsad'
      }
      this.$put("sid",params).then(res => {
        this.list = res.data;
      })
    },
    changeState:function(data){
      this.msg = data
    }
  }
};
</script>
<style scoped>
.el-header span {
  display: block;
  width: 200px;
  height: 60px;
  /* background: url("../assets/logo.png") no-repeat; */
}
.el-header,
.el-footer {
  background-color: rgba(255, 0, 0, 0.534);
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

