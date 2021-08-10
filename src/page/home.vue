<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:10
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-11 00:05:53
 * @Description: file content
-->
<template>
  <div class="Home">
    <header class="header">
    环信 MQTT 消息云（当前在线：{{count}}）
    </header>
    <div class="content">
      <div class="left">
        <Left :list="list" ref="LeftRank"></Left>
      </div>
      <div class="middle">
        <Middle ref="Middle" :list='list' @updateraise="setRaise"  @updatelove="setLove"></Middle>
      </div>
      <div class="right">
        <Right @updateList="updateList" ref="Right" @getCount='getCount' :list='list'></Right>
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
      count: 0,
       list: [
        {
          name: "还不会Hook？一份React Hook学习笔记",
          count: 599,
          info:'Hook 是 React 16.8.0 版本增加的新特性，可以在函数组件中使用 state 以及其他的 React 特性。',
          url: "https://imgeek.org/article/825358054"
        },
        {
          name: "JAVA面向对象简介",
          count: 592,
          info:'Java是一种面向对象的程序设计语言，了解面向对象的编程思想对于学习Java开发相当重要。',
          url: 'https://imgeek.org/article/825358049'
        },
        {
          name: "iOS 组件化方案",
          count: 321,
          info: '为什么要组件化？易移植、易维护、易重构、易根据业务做加减法、易开发',
          url: 'https://imgeek.org/article/825358044'
        },
        {
          name: "OC与Swift API的交互",
          count: 194,
          info: '互用性是让 Swift 和 Objective-C 相接合的一种特性，使你能够在一种语言编写的文件中使用另一种语言。当你准备开始把 Swift 融入到你的开发流程中时，你应该懂得如何利用互用性来重新定义并提高你写 Cocoa 应用的方案。',
          url: 'https://imgeek.org/article/825358042',
        },
        {
          name: "你可能不知道的动态组件玩法?",
          count: 121,
          info: '具体是怎么玩呢？别着急，听我慢慢道来，看完后会感慨Vue组件还能这么玩🐶，还会学会一个Stylelint插件，配有DEMO，以及隐藏在最后的彩蛋。',
          url: 'https://imgeek.org/article/825358019',
        },
      ],
    }
  },
  mounted(){
    // this.getAccessToken()
    // console.log(Mqtt);
    // let that = this;
    // setTimeout(() => {
    //   that.MQTTconnect();
    // }, 1500);
  },
  methods:{
    updateList(opt){
      console.log(opt);
      this.list = opt
    },
    setLove(opt){
      console.log(opt)
      this.list.forEach(v => {
        if(v.name==opt){
          v.count++
        }
      });
      this.list.sort(this.compare("count"))
      let that = this
      let _list = JSON.stringify({
        type:"list",
        list: that.list
        })
      this.$refs.Right.sendMessage(_list)

    },
    setRaise(opt){
      this.list.forEach(v => {
        if(v.name==opt){
          v.count++
        }
      });
      this.list.sort(this.compare("count"))
      let that = this
      let _list = JSON.stringify({
        type:"list",
        list: that.list
        })
      this.$refs.Right.sendMessage(_list)

    },
    compare(property){
      return function(obj1,obj2){
          var value1 = obj1[property];
          var value2 = obj2[property];
          return value2 - value1;     // 升序
      }
    },
    getCount(opt){
      this.count = opt
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