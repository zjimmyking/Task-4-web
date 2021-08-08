<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:27
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-08 00:20:42
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
        <span>100</span>
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
          name: "这是个话题1",
          count: 100,
        },
        {
          name: "这是个话题2这是个话题2这是个话题2这是个话题2这是个话题2这是个话题2这是个话题2",
          count: 200,
        },
        {
          name: "这是个话题3",
          count: 300,
        },
        {
          name: "这是个话题4",
          count: 400,
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