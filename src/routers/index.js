import Vue from 'vue'
import Router from 'vue-router'
import movie from './movie'
import mine from './mine'
import cinema from './cinema'
import admin from './admin'


Vue.use(Router)

var router=new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  base:'piggy',
  routes:[
    movie,
    mine,
    cinema,
    admin,
    {
      path:'/*',
      redirect:'/movie'
    }
  ]
})



export default router;