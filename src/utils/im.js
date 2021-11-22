/*
 * @Author: kincaid
 * @Date: 2021-08-08 11:48:16
 * @LastEditors: kincaid
 * @LastEditTime: 2021-11-22 23:26:57
 * @Description: file content
 */
import './sdk/mqtt'

var host = '' // 设置当前用户的接入点域名，接入点获取方法请参考接入准备章节文档
var username = '' // 用户名，在console中注册或创建 需要替换成自己的
var password = '' //创建的用户时候的密码 需要替换成自己的
var appId = '' // 从console控制台获取

var token //getToken后获取 链接mqtt使用

var port = 443 // WebSocket 协议服务端口，如果是走 HTTPS，设置443端口
// var topic = 't/t1' // 需要订阅或发送消息的topic名称
var useTLS = true // 是否走加密 HTTPS，如果走 HTTPS，设置为 true
var cleansession = true
var deviceId = 'test'+new Date().getTime() // MQTT 用户自定义deviceID
var clientId = deviceId + '@' + appId // deviceID@AppID
var reconnectTimeout = 5000 // 超时重连时间

let Paho = window.Paho || {}
let timer = null
let itv = null
// var mqtt
export default {
  data() {
    return {
      onlineCount: 0,
      onlineList: [],
      mqtt: null,
      topic: 't/t1',
      msgList: [],
      topicList:'',
      clockTime: 60,
      idx: 0
    }
  },
  methods: {
    getAccessToken () {
      var grantType = 'password'
      var request = new XMLHttpRequest()
      // token 域名
      var baseUrl = 'a1.easemob.com'
      // org_name
      var orgName = '1120210729238084'
      // app_name
      var appName = 'huanxinmqtt'
      // 拼接token接口
      var api = `http://${baseUrl}/${orgName}/${appName}/token`
      // Post请求
      request.open('post', api)
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          var res = JSON.parse(request.responseText)
          //从响应体中解析出token
          token = res.access_token
          console.log(token, 'accessToken')
          localStorage.setItem('token',token)
        } else {
          // throw new Error('请求失败，响应码为' + request.status)
        }
      }

      var params = {
        grant_type: grantType,
        username: username,
        password: password
      }
      // 发送ajax请求
      request.send(JSON.stringify(params))
    },
    MQTTconnect() {
      this.mqtt = new Paho.MQTT.Client(
        host,
        port,
        clientId
      )
      var options = {
        userName: username,
        password:  token,
        useSSL: true,
        timeout: 3,
        onSuccess: this.onConnect,
        mqttVersion: 4,
        cleanSession: cleansession,
        onFailure: function (message) {
          console.log(message)
          setTimeout(this.MQTTconnect, reconnectTimeout)
        }
      }
    
      this.mqtt.onConnectionLost = this.onConnectionLost
      this.mqtt.onMessageArrived = this.onMessageArrived
      if (username != null) {
        options.useSSL = useTLS // 如果使用 HTTPS 加密则配置为 true
      }
      this.mqtt.connect(options)
    },
    onConnect() {
      console.log('connect success')
      this.mqtt.subscribe(this.topic, {
        qos: 1
      }) // 订阅消息
      let message = new Paho.MQTT.Message("heart") //set body
      message.destinationName = this.topic // set topic
      this.mqtt.send(message)
      console.log("send msg : " + this.topic + "   " + message.payloadString)

     
      // mqtt.unsubscribe(topic) // 取消订阅
    },
    //获取倒计时
    getCountDown(){
      console.log('现在是我在同步时间了')
      const TIME_COUNT = 60;
      if (!timer) {
        let count = this.clockTime;

        var timer = setInterval(() => {
          let __obj1 = {
            type: 'topicIndex',
            idx: this.idx
          }
          let __str1 = JSON.stringify(__obj1)
          this.sendMessage(__str1);
        if (count >0 && count <= TIME_COUNT) {
     

          count--;
          let obj = {
            type: 'timeCount',
            time: count
          }
          //互相都发倒计时导致本地settimeout 不同步 时间长了就会闪 此时只能保证一个人同步
          let str = JSON.stringify(obj)
          this.sendMessage(str);

         
        } else {
          clearInterval(timer);
          timer = null;
          this.clockTime = 60
          let _idx = Math.ceil(Math.random()*10)-1
            this.idx=_idx
            let _obj1 = {
              type: 'topicIndex',
              idx: _idx
            }
            let _str1 = JSON.stringify(_obj1)
            this.sendMessage(_str1);
            this.getCountDown()
          }
        }, 1000)
      }
    },
    sendMessage (msg) {
      let message = new Paho.MQTT.Message(msg) //set body
      message.destinationName = this.topic // set topic
      this.mqtt.send(message)
      // console.log("send msg : " + this.topic + "   " + message.payloadString)
      // mqtt.unsubscribe(topic) // 取消订阅
    },
    onConnectionLost(response) {
      console.log(response);
      setTimeout(this.MQTTconnect, reconnectTimeout)
    },
    onMessageArrived(message) {
      // var topic = message.destinationName
      var payload = message.payloadString
      let that = this
      if(payload!='heart'){
        let obj = JSON.parse(payload)
        //接收消息
        if(obj.type=='text'||obj.type=='image'){
          if(obj.username==localStorage.getItem('username')){
            obj.isMe = true
          }else{
            obj.isMe =false
          }
          obj.avatar = obj.username[0]
          this.msgList.push(obj)
        }
        //获取在线人数
        if(obj.type=='online'){
          this.onlineList.push(obj.username)
          //去重
          this.onlineList = [...new Set(this.onlineList)]
          
          let _obj = JSON.stringify({
            type: 'onlineCount',
            count: that.onlineList
          })
          
          this.sendMessage(_obj)
        }
        //设置z在线人数
        if(obj.type=="onlineCount"){
          this.onlineCount = obj.count.length
          console.log(obj.count.length);
          if(this.onlineList.length==1){
            //获取最新的秒 和 index
            clearTimeout(itv)
            //如果两秒还没有人同步 就让我来 我要是同步了 告诉别人赶紧停止吧
            itv = setTimeout(()=>{
              console.log('wow');
              this.getCountDown()
            },2000)
          }
        }
        if(obj.type=='list'){
          this.topicList = obj.list
        }
        //获取当前题目的索引
        if(obj.type=='topicIndex'){
          this.idx = obj.idx
        }
        //同步秒
        if(obj.type=='timeCount'){
          //两秒之内要是有人倒计时  我就不管了
          clearTimeout(itv)
          console.log(new Date());
          //如果两秒还没有人同步 就让我来 我要是同步了 告诉别人赶紧停止吧
          itv = setTimeout(()=>{
            this.getCountDown()
          },3000)
          if(obj.time>=0){
            this.clockTime = obj.time
            
          }else{

            
          }
        }

      }else{
        // let that = this
        // setInterval(()=>{
          let name = JSON.stringify({type:'online',username: localStorage.getItem('username')})
          this.sendMessage(name);
        // },2000)
        
      }
      // console.log("recv msg : " + topic + "   " + payload)
    }
    
  }
}




