/*
 * @Author: kincaid
 * @Date: 2021-08-07 23:31:34
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-08 18:10:44
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router';
import util from './libs/util'
import WebIM from './easemob/web-im'
import store from './store/index'

Vue.prototype.$util = util
Vue.prototype.$im = WebIM
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
