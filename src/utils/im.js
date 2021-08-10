/*
 * @Author: kincaid
 * @Date: 2021-08-08 11:48:16
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-10 00:26:52
 * @Description: file content
 */
import './sdk/mqtt'
var host = 'on4ng0.cn1.mqtt.chat' // 设置当前用户的接入点域名，接入点获取方法请参考接入准备章节文档
var port = 443 // WebSocket 协议服务端口，如果是走 HTTPS，设置443端口
// var topic = 't/t1' // 需要订阅或发送消息的topic名称
var useTLS = true // 是否走加密 HTTPS，如果走 HTTPS，设置为 true
var cleansession = true
var deviceId = 'test'+new Date().getTime() // MQTT 用户自定义deviceID
var appId = 'on4ng0' // 从console控制台获取
var clientId = deviceId + '@' + appId // deviceID@AppID
var reconnectTimeout = 20000 // 超时重连时间
var username = 'test' // 用户名，在console中注册
// var password ='YWMtEa31WvKOEeuKAoGk5jJh8ajI7Z3Lsk1KtyzEZ3_lc1QQiFTg8o4R65I2hUgU8EeNAwMAAAF7AE6YsgBPGgD4W3LbZaK49g85xoMrFu_2OJLvHARRy4p_REb8Sr7pIw' // 用户密码为第一步中申请的token
// var password = ''
let Paho = window.Paho || {}

// var mqtt
export default {
  data() {
    return {
      mqtt: null,
      topic: 't/t1',
      msgList: [],
    }
  },
  methods: {
    // 客户端获取token(password)代码示例如下： 
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
      var token = ''
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
          throw new Error('请求失败，响应码为' + request.status)
        }
      }

      var params = {
        grant_type: grantType,
        username: localStorage.getItem('username'),
        password: 123
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
        userName: localStorage.getItem('username'),
        password: localStorage.getItem('token'),
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
        // options.userName = 'haha'
        // options.password = '123'
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
    sendMessage (msg) {
      let message = new Paho.MQTT.Message(msg) //set body
      message.destinationName = this.topic // set topic
      this.mqtt.send(message)
      console.log("send msg : " + this.topic + "   " + message.payloadString)
      // mqtt.unsubscribe(topic) // 取消订阅
    },
    onConnectionLost(response) {
      console.log(response);
      setTimeout(this.MQTTconnect, reconnectTimeout)
    },
    onMessageArrived(message) {
      var topic = message.destinationName
      var payload = message.payloadString
      if(payload!='heart'){
        let obj = JSON.parse(payload)
        if(obj.username==localStorage.getItem('username')){
          obj.isMe = true
        }else{
          obj.isMe =false
        }
        obj.avatar = obj.username[0]
        this.msgList.push(obj)
        // this.msgList = this.msgList.concat([])
        // this.msgList = JSON.parse(JSON.stringify(this.msgList))
        // this.msgList=Object.assign({},this.msgList)
        console.log(this.msgList)
        
      }
      console.log("recv msg : " + topic + "   " + payload)
    }
    
  }
}



