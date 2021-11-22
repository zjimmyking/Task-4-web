<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:04
 * @LastEditors: kincaid
 * @LastEditTime: 2021-11-22 23:02:37
 * @Description: file content
-->
<template>
  <div class="Login">
    <header class="Login-content">
      <img class="logo" :src="Logo" alt="" />
      <center>Hi. Welcome 环信 MQTT 消息云</center>
      <div class="ipt">
        <input type="text" v-model="username" placeholder="此处是昵称" />
      </div>
      <button class="btn" @click="register">进入聊天室</button>
    </header>
    <div class="loading" v-if="showLoading">
      <img class="imgRotate" :src="Loading" alt="" />
    </div>
  </div>
</template>

<script>
import Logo from "../assets/image/logo_icon.png";
import Loading from "../assets/image/loading.png";
import Mqtt  from '../utils/im'
export default {
  mixins: [Mqtt],
  components: {},
  data() {
    return {
      Logo: Logo,
      Loading: Loading,
      showLoading: false,
      username:''
    };
    
  },
  mounted(){
      this.getAccessToken()
  },
  methods:{
    register(){
      //如果存在此用户 就直接登录 不存在就先注册再登陆
     this.showLoading = true
      // this.$im.register(this.username)
      localStorage.setItem('username',this.username)
      setTimeout(()=>{
        this.showLoading =false
        this.$router.push({name:'home'})
      },2000)
      // Mqtt.getAccessToken()
      // Mqtt.MQTTconnect()
    }
  }
};
</script>

<style lang="less" scoped>
.Login {
  min-width: 1440px;
  height: 100%;
  background: linear-gradient(134deg, #c182dc 0%, #fb7c62 94%, #ff7c5b 100%);
}
.Login-content {
  width: 350px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* background: red; */
}
.logo {
  display: block;
  width: 176px;
  height: 116px;
  margin: 0 auto;
}
center {
  color: #ffffff;
  font-size: 14px;
  line-height: 40px;
}
.ipt {
  color: #ffffff;
  font-size: 14px;
  margin: 0 auto;
  width: 100%;
  border-bottom: 2px solid #ffffff;
  margin-top: 100px;
}
input {
  border: none;
  outline: none;
  width: 100%;
  padding-left: 4px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0);
  color: #ffffff;
}
input::placeholder {
  color: #ffffff;
}
.btn {
  width: 350px;
  height: 48px;
  background: linear-gradient(162deg, #b857e2 0%, #ee6060 100%);
  border-radius: 4px;
  color: #ffffff;
  text-align: center;
  line-height: 48px;
  font-size: 18px;
  margin-top: 50px;
  cursor: pointer;
  &:active{
    transform: scale(0.9);
  }
  &:hover{
    opacity: .9;
  }
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.loading{
  width: 460px;
  height: 210px;
  background: rgba(0,0,0,0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 6px;
}

.imgRotate {
  width: 52px;
  height: 58px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  -webkit-transform: rotate(360deg);
  animation: rotation 1s linear infinite;
  -moz-animation: rotation 1s linear infinite;
  -webkit-animation: rotation 1s linear infinite;
  -o-animation: rotation 1s linear infinite;
}
</style>>

