<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:35
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-08 01:48:55
 * @Description: file content
-->
<template>
  <div class="Middle">
    <div class="time">
      <img :src="TimeIcon" alt="" />
      <p>倒计时：0:60</p>
    </div>
    <div class="middle_topic">
      <div class="topic_item">
        <span class="label">话题名称：</span>
        <span class="info">下载MQTT客户端 </span>
      </div>
      <div class="topic_item">
        <span class="label">话题内容：</span>
        <span class="info"
          >下载MQTT客户端
          常见的MQTT客户端整理如下，下载客户端后可快速连接环信MQTT消息云下载MQTT客户端
          常见的MQTT客户端整理如下，下载客户端后可快速连接环信MQTT消息云
        </span>
      </div>
      <div class="topic_item">
        <span class="label">话题地址：</span>
        <a href="#" class="info"
          >https://1t2pt8.axshare.com/#id=pb023f&p=话题聊天室-_
        </a>
      </div>
      <div class="topic_item">
        <span class="label">点赞数：</span>
        <span class="info">100人 </span>
      </div>
    </div>
    <div class="middle_btns">
      <div class="middle_btn">
        <img class="raise" :src="Raise" alt="" />
        点赞
      </div>
      <div class="middle_btn">
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
  data() {
    return {
      Love: Love,
      Raise: Raise,
      TimeIcon: TimeIcon,
    };
  },
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
      width: 700px;
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
        width: 617px;
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
    width: 684px;
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