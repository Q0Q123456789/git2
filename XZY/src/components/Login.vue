<template>
<div id='login'>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="../static/images/login1.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../static/images/login2.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../static/images/login3.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../static/images/login4.jpg" alt="">
      </div>
    </div>
  </div>
  <div class="logding"></div>
  <div class="login">
    <div class="username">
      <span class="name">用户名：</span>
      <span><input type="name" placeholder="请输入账号" ref="name" /></span>
    </div>
    <div class="password">
      <span class="name">密码：</span>
      <span<input type="password" placeholder="请输入密码" ref="password" /></span>
    </div>
    <div class="submin" @click="login()">登录</div>
  </div>
  <div class="logo"></div>
</div>
</template>
<script>
import Swiper from 'swiper';
import SHA from 'js-sha1';
import 'swiper/dist/css/swiper.min.css';
export default {
  name: 'login',
  data() {
    return {

    };
  },
  components: {},
  mounted() {
    const mySwiper = new Swiper('.swiper-container', {
      autoplay: true //等同于以下设置
    });
   
  },
  methods: {
    login:function(){
      var parent = {
        'username':this.$refs.name.value,
        "password":SHA(this.$refs.password.value)
      }
      this.$post('login',parent).then(res=>{
        if( res && res.responseCode === '10001' ){
            this.$message({
              message:res.responseMsg,
              type:'success'
            });
            this.$cookies.set('key', JSON.stringify(res.data), { expires: 6000 })
            this.$router.push({ path: '/header' })
        } else if(res.responseCode === '10008') {
            this.$message.error(res.responseMsg);
        }
      }) 
    }
  }
};
</script>
<style lang='less' >
#login {
  // width: 1800px;
  margin: 0 auto;
  .login {
    width: 500px;
    height: 300px;
    box-shadow: 1px 1px 10px #eee;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -150px;
    z-index: 10;
    .username,
    .password {
      padding: 40px 20px;
    }
    input {
      width: 300px;
      height: 24px;
      border: none;
      border-radius: 20px;
      padding: 2px 10px;
    }
    .name {
      display: inline-block;
      width: 100px;
      color: #000;
      text-shadow: 0px 1px 10px blue;
      line-height: 24px;
    }
    .submin{
      color: #000;
      margin: auto;
      width: 150px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      box-shadow: 1px 1px 10px #eee;
      border-radius: 10px;
      text-shadow: 0px 1px 10px blue;
      cursor: pointer;
    }
  }
  .logding {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 9;
  }
  .logo{
    width: 200px;
    height: 55px;
    background: red url('../../src/static/images/logo.png');
    margin:25px auto;
  }
}
</style>