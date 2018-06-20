<template>
  <div id="Home">
    <div>
      <div class="left">
        <div class="head"></div>
        <div class="message">
          <span class="name"><span>名　　称：</span><span>{{message.name}}</span></span>
          <span class="time"><span>登录时间：</span><span>{{message.time}}</span></span>
          <span class="identity"><span>权 限 组：</span><span>{{message.identity}}</span></span>
          <span class="phone"><span>手 机 号：</span><span>{{message.phone}}</span></span>
        </div>
      </div>
      <div class="right">
        <span>修改密码</span>
      </div>
    </div>
    <div class="password">
      <div class="modify">
        <input type="text">
        <input type="text">
        <input type="text">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      list: "",
      message:{
        name:'',
        time:'',
        identity:'',
        phone:''
      }
    };
  },
  components: {},
  mounted() {
    this.isCookie()
  },
  methods: {
    isCookie(){
      let that = this;
      let key = JSON.parse(that.$cookies.get("key"));
      that.message.name = key[0].username;
      that.message.identity = that.isweight(key[0].weight);
      that.message.time = key[0].loginTime;
      that.message.phone = key[0].phone
    },
    isweight(i){
      switch(i){
        case "1":
        return '超级管理员';
        case "2":
        return '店长';
        case "3":
        return '创库管理员';
        case "4":
        return '设计师';
        case "5":
        return '业务员';
        case "6":
        return '销售';
      }
    }
  }
};
</script>
<style lang="less" >
#Home {
 width: 100%;
 height: 100%;
 div{
   overflow: hidden;
 }
 .left{
   float: left;
   width: 800px;
   height: 150px;
   .head{
    width: 150px;
    height: 150px;
    background: #fff url("../../../src/static/images/timg.jpg") no-repeat 45% 100%;
    background-size: 100%;
    border-radius: 50%;
    float: left;
   }
   .message{
     width: 300px;
     height: 150px;
     float: left;
     padding: 30px 0 0 30px;
     .name,.time,.identity,.phone{
       width: 300px;
       padding-bottom: 10px;
       display: inline-block;
       text-align: left;
     }
   }
 }
 .right{
   width: 300px;
   float: right;
   span{
     float: right;
     width: 70px;
     display: block;
     padding: 5px 25px;
     border:1px solid #ccc;
     border-radius: 2px;
     cursor: pointer;
   }
 }
 .password{
   width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 9;
 }
 .modify{
   width: 300px;
   height: 250px;
   box-shadow: 1px 1px 10px #000;
   position: absolute;
   left: 50%;
   top: 50%;
   margin-left: -150px;
   margin-top: -175px;
   input{
     width: 200px;
     height: 25px;
     border-radius: 5px;
     margin: 10px 0;
     padding: 2px 5px;
    //  border: none;
   }
 }
}
</style>
