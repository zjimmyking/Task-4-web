/*
 * @Author: kincaid
 * @Date: 2021-08-07 23:42:34
 * @LastEditors: kincaid
 * @LastEditTime: 2021-08-11 09:27:59
 * @Description: file content
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '../page/login.vue';
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../page/login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../page/home.vue'),
  }
]
const router = new VueRouter({
  routes,
  base: '/',
  mode:'hash'
});
export default router;
