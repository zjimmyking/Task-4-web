/*
 * @Author: kincaid
 * @Date: 2019-08-27 21:29:59
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-08 15:20:09
 * @Description: file content
 */

import websdk from 'easemob-websdk';
import config from './web-im-config';
import emoji from './emoji';
import msgType from './msg-type';

const WebIM = window.WebIM || {};

WebIM.config = config;
WebIM.msgType = msgType;
WebIM.conn = new websdk.connection({
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    isAutoLogin: false,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isStropheLog: WebIM.config.isStropheLog,
    delivery: WebIM.config.delivery,
    appKey: WebIM.config.appkey
});

if (!WebIM.conn.apiUrl) {
    WebIM.conn.apiUrl = WebIM.config.apiURL;
}

websdk.debug(false);

// const appKeyPair = WebIM.config.appkey.split("#");
// const baseUrl = `${WebIM.config.apiURL}/${appKeyPair[0]}/${appKeyPair[1]}`;

var options = {
    username: 'nickname',
    password: '123',
    nickname: 'nickname',
    appKey: WebIM.config.appkey,
    success: function () {},
    error: function (err) {
        let errorData = JSON.parse(err.data);
        if (errorData.error === 'duplicate_unique_property_exists') {
            console.log('用户已存在！');
        } else if (errorData.error === 'illegal_argument') {
            if (errorData.error_description === 'USERNAME_TOO_LONG') {
                console.log('用户名超过64个字节！')
            } else {
                console.log('用户名不合法！')
            }
        } else if (errorData.error === 'unauthorized') {
            console.log('注册失败，无权限！')
        } else if (errorData.error === 'resource_limited') {
            console.log('您的App用户注册数量已达上限,请升级至企业版！')
        }
    },
};
WebIM.register = function (name) {
    options.username = name
    options.nickname = name
    WebIM.conn.registerUser(options)
}
WebIM.emoji = emoji;

export default WebIM;