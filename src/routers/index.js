import Vue from 'vue'
import Router from 'vue-router'
import movie from './movie'
import mine from './mine'
import cinema from './cinema'


Vue.use(Router)

var router=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    movie,
    mine,
    cinema,
    {
      path:'/*',
      redirect:'/movie'
    }
  ]
})



export default router;