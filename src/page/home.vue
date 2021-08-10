<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:10
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-09 22:23:21
 * @Description: file content
-->
<template>
  <div class="Home">
    <header class="header">
    环信 MQTT 消息云（当前在线：5655）
    </header>
    <div class="content">
      <div class="left">
        <Left ref="LeftRank"></Left>
      </div>
      <div class="middle">
        <Middle ref="Middle" @updateraise="setRaise"  @updatelove="setLove"></Middle>
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
import Mqtt  from '../utils/im'

export default {
  mixins: [Mqtt],
  components:{Left,Right,Middle},
  data(){
    return{
      
    }
  },
  mounted(){
    this.getAccessToken()
    // console.log(Mqtt);
  },
  methods:{
    setLove(opt){
      console.log(opt)
      this.$refs['LeftRank'].list.forEach(v => {
        if(v.name==opt){
          v.count++
        }
      });
      this.$refs['LeftRank'].list.sort(this.compare("count"))

    },
    setRaise(opt){
      this.$refs['LeftRank'].list.forEach(v => {
        if(v.name==opt){
          v.count++
        }
      });
      this.$refs['LeftRank'].list.sort(this.compare("count"))

    },
    compare(property){
      return function(obj1,obj2){
          var value1 = obj1[property];
          var value2 = obj2[property];
          return value2 - value1;     // 升序
      }
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