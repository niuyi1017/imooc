import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})