<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:27
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-08 21:34:17
 * @Description: file content
-->
<template>
  <div class="Left">
    <header class="header">
      <span>排行榜</span>
    </header>
    <div class="left_topic" v-for="(item, index) in list" :key="index">
      <div class="left_topic_l">
        <span class="point">{{ index + 1 }}</span>
        <span class="name">{{ item.name }}</span>
      </div>
      <div class="count">
        <span>{{item.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Left',
  data() {
    return {
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
    };
  },
};
</script>

<style lang="less" scope>
.Left {
  .header {
    width: 292px;
    height: 64px;
    background: linear-gradient(180deg, #d75c97 0%, #ee6061 83%, #ee6060 100%);
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    line-height: 64px;
  }
  .left_topic {
    /* min-height: 56px; */
    border-bottom: 1px solid #d8d8d8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #191919;
    &_l {
      display: flex;
      justify-content: flex-start;
      width: 210px;
    }
    .point {
      color: #e96d6d;
      font-style: italic;
      margin-right: 10px;
    }
    .count {
      width: 45px;
      height: 35px;
      background: url(../assets/image/like_icon.png) no-repeat;
      background-size: cover;
      span {
        color: #e96d6d;
        font-size: 10px;
        display: block;
        width: 100%;
        text-align: center;
        line-height: 1.5em;
      }
    }
  }
}
</style>