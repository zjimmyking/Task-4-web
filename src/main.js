/*
 * @Author: kincaid
 * @Date: 2021-08-07 23:31:34
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-08 01:57:01
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
