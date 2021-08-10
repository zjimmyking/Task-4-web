<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:42
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-10 00:48:49
 * @Description: file content
-->
<template>
  <div class="Right">
    <div class="Right_t">
      <div class="chat" v-for="(item,index) in msgList" :key="index">
        <div class="chat_l" v-if="!item.isMe">
          <div class="chat_l_t">
            <span class="avatar">{{item.avatar}}</span>
            <span class="name">{{item.username}}</span>
            <span class="time">{{item.time}}</span>
          </div>
          <div class="chat_l_msg">
            {{item.msg}}
          </div>
        </div>
        <div class="chat_r" v-else>
          <div class="chat_r_t">
            <span class="time">{{item.time}}</span>
            <span class="name">{{item.username}}</span>
            <span class="avatar">{{item.avatar}}</span>
          </div>
          <div class="chat_r_msg">
            {{item.msg}}
          </div>
        </div>
      </div>
    </div>
    <div class="Right_b">
      <div class="tool">
        <img v-if="showDialog==false" :src="Emoji" alt="" @click="showDialog=!showDialog">
        <img v-else :src="EmojiActive" alt="" @click="showDialog=!showDialog">
        <input type="file" accept="image/png, image/jpeg" @change="getImage">
        <img :src="Pic" alt="">

      </div>
      <div class="send">
        <textarea id="input" v-model="text" placeholder="请输入信息"></textarea>
        <button @click="senMsg">发送</button>
      </div>
      <VEmojiPicker class="emoji" v-show="showDialog" @select="selectEmoji"/>

    </div>
  </div>
</template>

<script>
import Emoji from '../assets/image/emoji_icon.png'
import EmojiActive from '../assets/image/emoji_active_icon.png'

import Pic from '../assets/image/pic_icon.png'
import {VEmojiPicker} from 'v-emoji-picker'
import Mqtt  from '../utils/im'

export default {
  mixins: [Mqtt],
  name: "Right",
  props: {
    msg: String,
  },
  components:{
    VEmojiPicker
  },

  data() {
    return {
      text:'',
      showDialog: false,
      Emoji: Emoji,
      EmojiActive: EmojiActive,
      Pic: Pic,
      list: [
        {
          name: "M",
          msg: "hahahah",
          isMe: false,
        },
        {
          name: "M",
          msg: "111",
          isMe: true,
        },
      ],
    };
  },
  mounted(){
     let that = this
    setTimeout(()=>{
      that.MQTTconnect()
    },500)
  },
  methods:{
    selectEmoji(emoji) {// 选择emoji后调用的函数
      let input = document.getElementById("input")
      let startPos = input.selectionStart
      let endPos = input.selectionEnd
      let resultText = input.value.substring(0, startPos) + emoji.data + input.value.substring(endPos)
      input.value = resultText
      input.focus()
      input.selectionStart = startPos + emoji.data.length
      input.selectionEnd = startPos + emoji.data.length
      this.text = resultText
    },
    senMsg(){
      this.list[0].msg = this.text
      let msg = {msg:this.text,username:localStorage.getItem('username'),time:this.$util.dateFormat(new Date(), 'hh:mm')}
      msg = JSON.stringify(msg)
      this.sendMessage(msg)
      this.text=''
    },

    image2Base64(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
    },
    getImgBase64(url){
          var base64="";
          var img = new Image();
          img.src=url;
          img.onload=function(){
              base64 = this.image2Base64(img);
              this.sendMessage(base64)
          }
      },

    getImage(e){
      console.log(e)
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Right{
  position: relative;
  height: 100%;
  &_t{
    padding-bottom: 100px;
    height: 100%;
    overflow-y: scroll;
    .chat{
      
      &_l{
        padding: 15px;
        &_t{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span{
            margin-right: 10px;
          }
          .avatar{
            width: 22px;
            height: 22px;
            display: block;
            line-height: 22px;
            text-align: center;
            background: #E96D6D;
            border-radius: 11px;
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
          }
          .name{
            color: #191919;
            font-weight: 600;
            font-size: 14px;
          }
          .time{
            color: #545454;
            font-size: 12px;
          }
        }
        &_msg{
          max-width: 200px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #ECECF1;
          padding: 10px;
          margin-top: 15px;
          font-size: 12px;

        }
      }
      &_r{
        &:after{
          content: "020"; 
          display: block; 
          height: 0; 
          clear: both; 
          visibility: hidden;  
        }
        padding: 15px;
        &_t{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          span{
            margin-left: 10px;
          }
          .avatar{
            width: 22px;
            height: 22px;
            display: block;
            line-height: 22px;
            text-align: center;
            background: #E96D6D;
            border-radius: 11px;
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
          }
          .name{
            color: #191919;
            font-weight: 600;
            font-size: 14px;
          }
          .time{
            color: #545454;
            font-size: 12px;
          }
        }
        &_msg{
          max-width: 200px;
          background: linear-gradient(162deg, #E15E80 0%, #EE6060 100%);
          border-radius: 4px;
          border: 1px solid #ECECF1;
          padding: 10px;
          margin-top: 15px;
          font-size: 12px;
          float: right;
          color: #ffffff;
        }
      }
    }
  }
  &_b{
    width: 100%;
    height: 88px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #E5DFDF;
    border-radius: 18px 18px 4px 4px;
    .tool{
      padding: 10px 10px;
      display: flex;
      justify-content: flex-start;
      background: rgba(0,0,0,0);
      img{
        width: 22px;
        height: 22px;
        margin-right: 14px;
      }
    }
    .send{
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      textarea{
        outline: none;
        border: none;
        width: 100px;
        background: rgba(0,0,0,0);
        width: 200px;
      }
      button{
        width: 80px;
        height: 30px;
        background: #E96D6D;
        border-radius: 15px;
        color: #ffffff;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .emoji{
      position: absolute;
      top: -320px;
      left: 0;
      width: 300px;
      height: 300px;
    }
  }
}
</style>
