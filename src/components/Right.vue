<!--
 * @Author: kincaid
 * @Date: 2021-08-07 23:37:42
 * @LastEditors: kincaid
 * @LastEditTime: 2021-09-18 09:54:33
 * @Description: file content
-->
<template>
  <div class="Right">
    <div class="Right_t" id="data-list-content">
      <div class="chat" v-for="(item, index) in msgList" :key="index">
        <div class="chat_l" v-if="!item.isMe">
          <div class="chat_l_t">
            <span class="avatar">{{ item.avatar }}</span>
            <span class="name">{{ item.username }}</span>
            <span class="time">{{ item.time }}</span>
          </div>
          <div class="chat_l_msg" v-if="item.type=='text'">
            {{ item.msg }}
          </div>
          <div class="chat_l_msg_image" v-if="item.type=='image'">
            <img :src="item.msg" alt="">
          </div>
        </div>
        <div class="chat_r" v-else>
          <div class="chat_r_t">
            <span class="time">{{ item.time }}</span>
            <span class="name">{{ item.username }}</span>
            <span class="avatar">{{ item.avatar }}</span>
          </div>
          <div class="chat_r_msg" v-if="item.type=='text'">
            {{ item.msg }}
          </div>
          <div class="chat_r_msg_image" v-if="item.type=='image'">
            <img :src="item.msg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="Right_b">
      <div class="tool">
        <img
          v-if="showDialog == false"
          :src="Emoji"
          alt=""
          @click="showDialog = !showDialog"
        />
        <img
          v-else
          :src="EmojiActive"
          alt=""
          @click="showDialog = !showDialog"
        />
        <input id="upImageFile"  type="file" accept="image/png, image/jpeg" @change="ImageToBase64" />
        <img :src="Pic" alt="" />
      </div>
      <div class="send">
        <textarea id="input" v-model="text" placeholder="请输入信息"></textarea>
        <button @click="senMsg">发送</button>
      </div>
      <VEmojiPicker class="emoji" v-show="showDialog" @select="selectEmoji" />
    </div>
  </div>
</template>

<script>
import Emoji from "../assets/image/emoji_icon.png";
import EmojiActive from "../assets/image/emoji_active_icon.png";

import Pic from "../assets/image/pic_icon.png";
import { VEmojiPicker } from "v-emoji-picker";
import Mqtt from "../utils/im";

export default {
  mixins: [Mqtt],
  name: "Right",
  props: {
    msg: String,
    list: Array,
  },
  components: {
    VEmojiPicker,
  },

  data() {
    return {
      text: "",
      showDialog: false,
      Emoji: Emoji,
      EmojiActive: EmojiActive,
      Pic: Pic,
    };
  },
  watch:{
    'msgList': 'scrollToBottom',
    onlineList(n){
      this.$emit('getCount',n.length)
    },
    topicList(n){
      if(n=='') return
      this.$emit('updateList',n)
    },
    clockTime(n){
      if(n<0) return
      
      this.$emit('getTimeCount',n)
    },
    idx(n){
      if(n=='') return
      
      this.$emit('getListIdx',n)
    }
  },
  mounted() {
    let that = this;
    setTimeout(() => {
      that.MQTTconnect();
    }, 500);
    setTimeout(() => {
      let obj = JSON.stringify({type:'online',username: localStorage.getItem('username')})
      this.sendMessage(obj);
    }, 1500);
  },
  methods: {
    selectEmoji(emoji) {
      // 选择emoji后调用的函数
      let input = document.getElementById("input");
      let startPos = input.selectionStart;
      let endPos = input.selectionEnd;
      let resultText =
        input.value.substring(0, startPos) +
        emoji.data +
        input.value.substring(endPos);
      input.value = resultText;
      input.focus();
      input.selectionStart = startPos + emoji.data.length;
      input.selectionEnd = startPos + emoji.data.length;
      this.text = resultText;
      // this.scrollToBottom()
    },
    senMsg() {
      if(this.text==''){
        return
      }
      let msg = {
        type: 'text',
        msg: this.text,
        username: localStorage.getItem("username"),
        time: this.$util.dateFormat(new Date(), "hh:mm"),
      };
      msg = JSON.stringify(msg);
      this.sendMessage(msg);
      this.text = "";
      this.scrollToBottom()
    },

    scrollToBottom() {
      this.$nextTick(() => {
        var div = document.getElementById("data-list-content");
        div.scrollTop = div.scrollHeight;
      });
    },
    ImageToBase64() {
      let that = this
      let files = document.getElementById('upImageFile').files[0];
      if(!files){
        return
      }
      var reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onload = () => {
          console.log('file 转 base64结果：' + reader.result)
          let obj = {
            type: 'image',
            msg: reader.result,
            username: localStorage.getItem("username"),
            time: that.$util.dateFormat(new Date(), "hh:mm"),
          }
          obj = JSON.stringify(obj)
          that.sendMessage(obj);
          that.scrollToBottom()

      }
      reader.onerror = function (error) {
          console.log('Error: ', error)
      }
    }
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Right {
  position: relative;
  height: 100%;
  &_t {
    padding-bottom: 160px;
    height: 100%;
    width: 300px;
    overflow-y: scroll;
    .chat {
      &_l {
        padding: 15px;
        &_t {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span {
            margin-right: 10px;
          }
          .avatar {
            width: 22px;
            height: 22px;
            display: block;
            line-height: 22px;
            text-align: center;
            background: #e96d6d;
            border-radius: 11px;
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
          }
          .name {
            color: #191919;
            font-weight: 600;
            font-size: 14px;
          }
          .time {
            color: #545454;
            font-size: 12px;
          }
        }
        &_msg {
          display: inline-block;
          max-width: 200px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #ececf1;
          padding: 10px;
          margin-top: 15px;
          font-size: 12px;
          &_image{
            // border: 1px solid #ececf1;
            padding: 10px;
            margin-top: 15px;
            background: rgba(0, 0, 0, 0);
            img{
              max-width: 200px;
              object-fit: contain;
              // float: left;
            }
          }
        }
      }
      &_r {
        &:after {
          content: "020";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
        padding: 15px;
        &_t {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          span {
            margin-left: 10px;
          }
          .avatar {
            width: 22px;
            height: 22px;
            display: block;
            line-height: 22px;
            text-align: center;
            background: #e96d6d;
            border-radius: 11px;
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
          }
          .name {
            color: #191919;
            font-weight: 600;
            font-size: 14px;
          }
          .time {
            color: #545454;
            font-size: 12px;
          }
        }
        &_msg {
          max-width: 200px;
          background: linear-gradient(162deg, #e15e80 0%, #ee6060 100%);
          border-radius: 4px;
          border: 1px solid #ececf1;
          padding: 10px;
          margin-top: 15px;
          font-size: 12px;
          float: right;
          color: #ffffff;
          &_image{
            // border: 1px solid #ececf1;
            padding: 10px;
            margin-top: 15px;
            background: rgba(0, 0, 0, 0);
            img{
              max-width: 200px;
              object-fit: contain;
              float: right;
            }
          }
        }
      }
    }
  }
  &_b {
    width: 100%;
    height: 138px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #e5dfdf;
    border-radius: 18px 18px 4px 4px;
    .tool {
      padding: 10px 10px;
      display: flex;
      justify-content: flex-start;
      background: rgba(0, 0, 0, 0);
      img {
        width: 22px;
        height: 22px;
        margin-right: 14px;
      }
      input{
        position: absolute;
        top: 11px;
        left: 46px;
        width: 22px;
        height: 22px;
        opacity: 0;
      }
    }
    .send {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      textarea {
        outline: none;
        border: none;
        width: 100px;
        background: rgba(0, 0, 0, 0);
        width: 200px;
      }
      button {
        width: 80px;
        height: 30px;
        background: #e96d6d;
        border-radius: 15px;
        color: #ffffff;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .emoji {
      position: absolute;
      top: -320px;
      left: 0;
      width: 300px;
      height: 300px;
    }
  }
}
</style>
