import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
Vue.prototype.axios=axios;  //给vue添加axios方法

Vue.filter('setWH',(url,arg)=>{  //arg:传进来的图片大小
  return url.replace(/w\.h/,arg);   //正则：把w.h替换成arg
});

import betterScroll from '@/components/betterScroll';
Vue.component('betterScroll',betterScroll);  //全局注册，'变量名'，组件名

import loading from '@/components/loading';
Vue.component('loading',loading);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
