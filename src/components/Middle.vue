<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:35
 * @LastEditors: kincaid
 * @LastEditTime: 2021-09-03 02:01:25
 * @Description: file content
-->
<template>
  <div class="Middle">
    <div class="time">
      <img :src="TimeIcon" alt="" />
      <p>倒计时：0:{{clockTime}}</p>
    </div>
    <div class="middle_topic">
      <div class="topic_item">
        <span class="label">话题名称：</span>
        <span class="info">{{item.name}} </span>
      </div>
      <div class="topic_item">
        <span class="label">话题内容：</span>
        <span class="info">
          {{item.info}} 
        </span>
      </div>
      <div class="topic_item">
        <span class="label">话题地址：</span>
        <a target="true" :href="item.url" class="info">
          {{item.url}}
        </a>
      </div>
      <div class="topic_item">
        <span class="label">点赞数：</span>
        <span class="info">{{item.count}} </span>
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
    clockTime: Number,
    list: Array,
    item: Object,
    idx: {
      type: Number,
      default: ()=> 0
    }
  },
  data() {
    return {
      count: '',
      // idx: 0,
      Love: Love,
      Raise: Raise,
      TimeIcon: TimeIcon,

    };
  },
  mounted(){
    // this.getCountDown()
  },
  methods:{
    raise(){

      this.$emit('updateraise',this.item.name)
    },
    love(){
      
      this.$emit('updatelove',this.item.name)
    },
    getCountDown(){
      
      const TIME_COUNT = 10;
      if (!this.timer) {
        this.count = this.clockTime;
        console.log(this.count);
        this.timer = setInterval(() => {
        if (this.count >0 && this.count <= TIME_COUNT) {
          this.count--;
          let flag = true
          setTimeout(()=>{
            flag = false
          },600)
          if(flag){
            this.$emit('updateCount',this.count)
            
          }else{

          }
        } else {
          clearInterval(this.timer);
          this.timer = null;
          //更改新的文章
          // this.idx++
          // if(this.idx==10){
          //   this.idx=0
          // }
          // this.$emit('updateIdx',this.list)
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