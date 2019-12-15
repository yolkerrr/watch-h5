import Vue from 'vue'
import Router from 'vue-router'
import index from "../pages/index"
import mine from "../pages/mine"
import detail from "../pages/detail"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta:{
        keepAlive:true
      }
    }, {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    }
  ]
})
