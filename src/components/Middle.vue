<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:35
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-13 00:33:30
 * @Description: file content
-->
<template>
  <div class="Middle">
    <div class="time">
      <img :src="TimeIcon" alt="" />
      <p>倒计时：0:{{count}}</p>
    </div>
    <div class="middle_topic">
      <div class="topic_item">
        <span class="label">话题名称：</span>
        <span class="info">{{list[idx].name}} </span>
      </div>
      <div class="topic_item">
        <span class="label">话题内容：</span>
        <span class="info">
          {{list[idx].info}} 
        </span>
      </div>
      <div class="topic_item">
        <span class="label">话题地址：</span>
        <a target="true" :href="list[idx].url" class="info">
          {{list[idx].url}}
        </a>
      </div>
      <div class="topic_item">
        <span class="label">点赞数：</span>
        <span class="info">{{list[idx].count}}人 </span>
      </div>
    </div>
    <div class="middle_btns">
      <div class="middle_btn" @click="raise" >
        <img class="raise" :src="Raise" alt="" />
        点赞
      </div>
      <div class="middle_btn" @click="love">
        <img class="love" :src="Love" alt="" />
        喜欢
      </div>
    </div>
  </div>
</template>

<script>
import Love from "../assets/image/love_icon.png";
import Raise from "../assets/image/raise_icon.png";

import TimeIcon from "../assets/image/time_icon.png";
export default {
  props: {
    list: Array
  },
  data() {
    return {
      count: '',
      idx: 0,
      Love: Love,
      Raise: Raise,
      TimeIcon: TimeIcon,
      // list: [
      //   {
      //     name: "还不会Hook？一份React Hook学习笔记",
      //     count: 599,
      //     info:'Hook 是 React 16.8.0 版本增加的新特性，可以在函数组件中使用 state 以及其他的 React 特性。',
      //     url: "https://imgeek.org/article/825358054"
      //   },
      //   {
      //     name: "JAVA面向对象简介",
      //     count: 592,
      //     info:'Java是一种面向对象的程序设计语言，了解面向对象的编程思想对于学习Java开发相当重要。',
      //     url: 'https://imgeek.org/article/825358049'
      //   },
      //   {
      //     name: "iOS 组件化方案",
      //     count: 321,
      //     info: '为什么要组件化？易移植、易维护、易重构、易根据业务做加减法、易开发',
      //     url: 'https://imgeek.org/article/825358044'
      //   },
      //   {
      //     name: "OC与Swift API的交互",
      //     count: 194,
      //     info: '互用性是让 Swift 和 Objective-C 相接合的一种特性，使你能够在一种语言编写的文件中使用另一种语言。当你准备开始把 Swift 融入到你的开发流程中时，你应该懂得如何利用互用性来重新定义并提高你写 Cocoa 应用的方案。',
      //     url: 'https://imgeek.org/article/825358042',
      //   },
      //   {
      //     name: "你可能不知道的动态组件玩法?",
      //     count: 121,
      //     info: '具体是怎么玩呢？别着急，听我慢慢道来，看完后会感慨Vue组件还能这么玩🐶，还会学会一个Stylelint插件，配有DEMO，以及隐藏在最后的彩蛋。',
      //     url: 'https://imgeek.org/article/825358019',
      //   },
      // ],
    };
  },
  mounted(){
    this.getCountDown()
  },
  methods:{
    raise(){
      // let _list = this.list 
      // _list[this.idx].count++ 
      // this.list= Object.assign({},_list)
      this.$emit('updateraise',this.list[this.idx].name)
    },
    love(){
      // let _list = this.list 
      // _list[this.idx].count++ 
      // this.list= Object.assign({},_list)
      this.$emit('updatelove',this.list[this.idx].name)
    },
    getCountDown(){
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
        } else {
          clearInterval(this.timer);
          this.timer = null;
          //更改新的文章
          this.idx++
          if(this.idx==5){
            this.idx=0
          }
          this.$emit('updateIdx',this.idx)
          this.getCountDown()
          }
        }, 1000)
      }
    }
  }
};
</script>

<style lang='less' scope>
.Middle {
  .time {
    width: 286px;
    height: 298px;
    background: url(../assets/image/time_bg.png) no-repeat;
    background-size: cover;
    margin: 0 auto;
    margin-top: 47px;
    box-sizing: border-box;
    padding-top: 72px;
    color: #ffffff;
    text-align: center;
    img {
      display: block;
      width: 108px;
      height: 107px;
      margin: 0 auto;
    }
    p {
      line-height: 60px;
    }
  }

  /**话题**/
  .middle_topic {
    margin-top: 20px;
    .topic_item {
      max-width: 700px;
      margin: 0 auto;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 20px;
      .label {
        width: 80px;
        line-height: 24px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #191919;
      }
      .info {
        max-width: 617px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #191919;
        line-height: 24px;
        opacity: 0.7;
      }
      a {
        color: #1188e0;
        text-decoration: none;
      }
    }
  }

  .middle_btns {
    max-width: 684px;
    height: 154px;
    background: #ededed;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .middle_btn {
      width: 214px;
      height: 48px;
      background: linear-gradient(162deg, #b857e2 0%, #ee6060 100%);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      cursor: pointer;
      &:active{
        transform: scale(0.9);
      }
      &:hover{
        opacity: .9;
      }
      .love {
        width: 17px;
        height: 16px;
        margin-right: 6px;
        position: relative;
        top: 2px;
      }
      .raise {
        width: 17px;
        height: 18px;
        margin-right: 6px;
        position: relative;
        top: -1px;
      }
    }
  }
}
</style>