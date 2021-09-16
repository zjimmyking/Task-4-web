<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:10
 * @LastEditors: kincaid
 * @LastEditTime: 2021-09-16 23:24:53
 * @Description: file content
-->
<template>
  <div class="Home">
    <header class="header">
      <span class="rank-tit">排行榜</span>
    环信 MQTT 消息云（当前在线：{{count}}）
    </header>
    <div class="content">
      <div class="left">
        <Left :list="list" ref="LeftRank"  @updateraise="setRaise"></Left>
      </div>
      <div class="middle">
        <Middle ref="Middle" :clockTime="clockTime" @updateCount="updateCount" :item="listOrigin[idx]" :idx='idx' @updateIdx="updateIdx" :list='list' @updateraise="setRaise"  @updatelove="setLove"></Middle>
      </div>
      <div class="right">
        <Right @updateList="updateList" ref="Right" @getCount='getCount' :list='list' @getTimeCount="getTimeCount" @getListIdx="getListIdx"></Right>
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
      clockTime: 60,
      itemArticle: {
          id: 1,
          name: "还不会Hook？一份React Hook学习笔记",
          count: 599,
          info:'Hook 是 React 16.8.0 版本增加的新特性，可以在函数组件中使用 state 以及其他的 React 特性。',
          url: "https://imgeek.org/article/825358054"
        },
      idx: 0,
      count: 0,
       listOrigin: [
        {
          id: 1,
          name: "还不会Hook？一份React Hook学习笔记",
          count: 599,
          info:'Hook 是 React 16.8.0 版本增加的新特性，可以在函数组件中使用 state 以及其他的 React 特性。',
          url: "https://imgeek.org/article/825358054"
        },
        {
          id: 2,
          name: "JAVA面向对象简介",
          count: 592,
          info:'Java是一种面向对象的程序设计语言，了解面向对象的编程思想对于学习Java开发相当重要。',
          url: 'https://imgeek.org/article/825358049'
        },
        {
          id: 3,
          name: "iOS 组件化方案",
          count: 321,
          info: '为什么要组件化？易移植、易维护、易重构、易根据业务做加减法、易开发',
          url: 'https://imgeek.org/article/825358044'
        },
        {
          id: 4,
          name: "OC与Swift API的交互",
          count: 194,
          info: '互用性是让 Swift 和 Objective-C 相接合的一种特性，使你能够在一种语言编写的文件中使用另一种语言。当你准备开始把 Swift 融入到你的开发流程中时，你应该懂得如何利用互用性来重新定义并提高你写 Cocoa 应用的方案。',
          url: 'https://imgeek.org/article/825358042',
        },
        {
          id: 5,
          name: "你可能不知道的动态组件玩法?",
          count: 121,
          info: '具体是怎么玩呢？别着急，听我慢慢道来，看完后会感慨Vue组件还能这么玩🐶，还会学会一个Stylelint插件，配有DEMO，以及隐藏在最后的彩蛋。',
          url: 'https://imgeek.org/article/825358019',
        }, {
          id: 6,
          name: 'iOS性能优化-卡顿',
          count: 110,
          info: '图像的显示可以简单理解成先经过CPU的计算/排版/编解码等操作，然后交由GPU去完成渲染放入缓冲中，当视频控制器接受到vSync时会从缓冲中读取已经渲染完成的帧并显示到屏幕上。',
          url: 'https://imgeek.org/article/825358099'
        },{
          id: 7,
          name: '性能优化面试官想听的是什么？别再说那些老掉牙的性能优化了',
          count: 100,
          info: '网上性能优化的文章太多了，都说如何如何请求优化代码优化之类的，所有人都知道的事，而且实际工作中根本不可能每个项目都用到那些全部，而是应该对我们的项目有针对性的优化，你说是吗？',
          url: 'https://imgeek.org/article/825358096'
        },{
          id: 8,
          name: '使用 Electron 开发桌面应用',
          count: 89,
          info: '众所周知，基于react脚手架搭建的项目，入口文件为index.js，因此在上面配置完成后，我们想要启动electron应用，需要修改项目入口为main.js',
          url: 'https://imgeek.org/article/825358094'
        },{
          id: 9,
          name: 'iOS 渲染过程',
          count: 88,
          info: '应用运行的卡顿率是一个十分重要的指标，相比慢、发热、占用内存高来讲，卡顿是用户第一时间能感知的东西，三步两卡的应用基本逃不出被卸载的命运，要想优化卡顿就要搞清楚画面卡住不动的原因，这就需要对整个渲染过程有一定了解，本文会从图层说起，来聊聊整个渲染过程以及优化点，在写这篇文章之前笔者努力在想，对于完全没有做过图形处理相关工作的工程师来说，理解这个过程是有一定难度的，那么要怎么写才可以脉络清晰又浅显易懂呢，想来想去还是从日常开发中的界面UI开始分析吧，毕竟可直接感知',
          url: 'https://imgeek.org/article/825358088'
        },{
          id: 10,
          name: 'Compose | 一文理解神奇的Modifier',
          count: 49,
          info: 'Jetpack Compose的预览版出来已经有很长时间了，相信很多读者都进行了一番尝试。注意：下文如无特殊说明，Compose均指代Jetpack Compose',
          url: 'https://imgeek.org/article/825358077'
        }
      ],
      list: [
        {
          id: 1,
          name: "还不会Hook？一份React Hook学习笔记",
          count: 599,
          info:'Hook 是 React 16.8.0 版本增加的新特性，可以在函数组件中使用 state 以及其他的 React 特性。',
          url: "https://imgeek.org/article/825358054"
        },
        {
          id: 2,
          name: "JAVA面向对象简介",
          count: 592,
          info:'Java是一种面向对象的程序设计语言，了解面向对象的编程思想对于学习Java开发相当重要。',
          url: 'https://imgeek.org/article/825358049'
        },
        {
          id: 3,
          name: "iOS 组件化方案",
          count: 321,
          info: '为什么要组件化？易移植、易维护、易重构、易根据业务做加减法、易开发',
          url: 'https://imgeek.org/article/825358044'
        },
        {
          id: 4,
          name: "OC与Swift API的交互",
          count: 194,
          info: '互用性是让 Swift 和 Objective-C 相接合的一种特性，使你能够在一种语言编写的文件中使用另一种语言。当你准备开始把 Swift 融入到你的开发流程中时，你应该懂得如何利用互用性来重新定义并提高你写 Cocoa 应用的方案。',
          url: 'https://imgeek.org/article/825358042',
        },
        {
          id: 5,
          name: "你可能不知道的动态组件玩法?",
          count: 121,
          info: '具体是怎么玩呢？别着急，听我慢慢道来，看完后会感慨Vue组件还能这么玩🐶，还会学会一个Stylelint插件，配有DEMO，以及隐藏在最后的彩蛋。',
          url: 'https://imgeek.org/article/825358019',
        }, {
          id: 6,
          name: 'iOS性能优化-卡顿',
          count: 110,
          info: '图像的显示可以简单理解成先经过CPU的计算/排版/编解码等操作，然后交由GPU去完成渲染放入缓冲中，当视频控制器接受到vSync时会从缓冲中读取已经渲染完成的帧并显示到屏幕上。',
          url: 'https://imgeek.org/article/825358099'
        },{
          id: 7,
          name: '性能优化面试官想听的是什么？别再说那些老掉牙的性能优化了',
          count: 100,
          info: '网上性能优化的文章太多了，都说如何如何请求优化代码优化之类的，所有人都知道的事，而且实际工作中根本不可能每个项目都用到那些全部，而是应该对我们的项目有针对性的优化，你说是吗？',
          url: 'https://imgeek.org/article/825358096'
        },{
          id: 8,
          name: '使用 Electron 开发桌面应用',
          count: 89,
          info: '众所周知，基于react脚手架搭建的项目，入口文件为index.js，因此在上面配置完成后，我们想要启动electron应用，需要修改项目入口为main.js',
          url: 'https://imgeek.org/article/825358094'
        },{
          id: 9,
          name: 'iOS 渲染过程',
          count: 88,
          info: '应用运行的卡顿率是一个十分重要的指标，相比慢、发热、占用内存高来讲，卡顿是用户第一时间能感知的东西，三步两卡的应用基本逃不出被卸载的命运，要想优化卡顿就要搞清楚画面卡住不动的原因，这就需要对整个渲染过程有一定了解，本文会从图层说起，来聊聊整个渲染过程以及优化点，在写这篇文章之前笔者努力在想，对于完全没有做过图形处理相关工作的工程师来说，理解这个过程是有一定难度的，那么要怎么写才可以脉络清晰又浅显易懂呢，想来想去还是从日常开发中的界面UI开始分析吧，毕竟可直接感知',
          url: 'https://imgeek.org/article/825358088'
        },{
          id: 10,
          name: 'Compose | 一文理解神奇的Modifier',
          count: 49,
          info: 'Jetpack Compose的预览版出来已经有很长时间了，相信很多读者都进行了一番尝试。注意：下文如无特殊说明，Compose均指代Jetpack Compose',
          url: 'https://imgeek.org/article/825358077'
        }
      ],
    }
  },
  mounted(){
    // this.getAccessToken()
    // console.log(Mqtt);
    // let that = this;
    // setTimeout(() => {
    //   console.log(this.idx);
    // }, 1500);
  },
  methods:{
    getTimeCount(opt){
      this.clockTime= opt
    },
    getListIdx(opt){
      this.idx= opt
    },
    updateCount(opt){
      let obj = {
        type: 'timeCount',
        time: opt
      }
      let str = JSON.stringify(obj)
      this.$refs.Right.sendMessage(str)

    },
    updateList(opt){
      this.list = opt
      this.list.forEach(v=>{
        if(v.name==this.listOrigin[this.idx].name){
          this.listOrigin[this.idx] = v
        }
      })
      this.itemArticle = this.list[this.idx]

    },
    setLove(opt){
      this.list.forEach(v => {
        if(v.name==opt){
          v.count++
          this.itemArticle = v
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
    setRaise(opt,type=true){
      this.list.forEach(v => {
        if(v.name==opt){
          v.count++
          if(type){
            this.itemArticle = v
          }

        }
      });
      this.list.sort(this.compare("count"))
      let that = this
      let _list = JSON.stringify({
        type:"list",
        list: that.list
        })
      this.$refs.Right.sendMessage(_list)
       this.list.forEach(v => {
        if(v.name==opt){
          // this.idx=v.id-1
        }
      });

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
    },
    updateIdx(list){
    //   // let idx = Math.ceil(Math.random()*10)-1
    //   // this.idx=idx
    //   // this.itemArticle = this.list[idx]
    //   //同步题目
    //   let obj = {
    //     type: "topicIndex",
    //     idx: idx
    //   }
    //   let str = JSON.stringify(obj)
    //   this.$refs.Right.sendMessage(str)

    }
  }
}
</script>

<style scope lang="less">
.rank-tit{
  display: block;
  width: 275px;
  float: left;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;

}
.Home{
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background: #F5F5F6;
}
.header{
  height: 44px;
  background: linear-gradient(167deg, #D65C99 0%, #EE6060 100%);
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  line-height: 44px;
  max-width: 1440px;
  margin: 0 auto;
}
.content{
  display: flex;
  justify-content: space-between;
  // max-width: 1440px;
  height: calc(100% - 44px);
  margin: 0 auto;
  .left{
    width: 292px;
    height: 100%;
    margin: 0;
    background: #F5F5F6;
    border-right: 1px solid #E5DFDF;
  }
  .middle{
    max-width: 848px;
    padding: 0 20px;
    height: 100%;
    background: #F5F5F6;
    box-sizing: border-box;
  }
  .right{
    width: 300px;
    height: 100%;
    background: #F5F5F6;
    border-left: 1px solid #E5DFDF;

    }
}


</style>