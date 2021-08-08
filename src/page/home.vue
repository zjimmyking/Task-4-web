<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:10
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-08 00:21:22
 * @Description: file content
-->
<template>
  <div class="Home">
    <header class="header">
    环信 MQTT 消息云（当前在线：5655）
    </header>
    <div class="content">
      <div class="left">
        <Left></Left>
      </div>
      <div class="middle">
        <Middle></Middle>
      </div>
      <div class="right">
        <Right></Right>
      </div>
    </div>
    </div>
</template>

<script>
import Left from '../components/Left.vue'
import Middle from '../components/Middle.vue'
import Right from '../components/Right.vue'

export default {
  components:{Left,Right,Middle},
  data(){
    return{
      
    }
  }
}
</script>

<style scope lang="less">
.Home{
  height: 100%;
  min-width: 1440px;
}
.header{
  height: 44px;
  background: linear-gradient(167deg, #D65C99 0%, #EE6060 100%);
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  line-height: 44px;
  width: 1440px;
  margin: 0 auto;
}
.content{
  display: flex;
  justify-content: space-between;
  width: 1440px;
  height: calc(100% - 44px);
  margin: 0 auto;
  .left{
    width: 292px;
    height: 100%;
    margin: 0;
    background: #F5F5F6;

  }
  .middle{
    width: 848px;
    height: 100%;
    background: #F5F5F6;
    border-left: 1px solid #E5DFDF;
    border-right: 1px solid #E5DFDF;

  }
  .right{
    width: 300px;
    height: 100%;
    background: #F5F5F6;
    }
}


</style>