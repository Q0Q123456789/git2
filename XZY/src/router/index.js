import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import VueTouch from 'vue-touch'
import Echarts from 'echarts'
import Cookies from 'cookies-js'

import ajax from '../public/ajax.js'
import 'element-ui/lib/theme-chalk/index.css'
import Login from '@/components/Login'
import Header from '@/components/Header'
import Home from '@/components/news/Home'
import News from '@/components/news/News'

Vue.prototype.$get = ajax.get
Vue.prototype.$post = ajax.post
Vue.prototype.$put = ajax.put
Vue.prototype.$del = ajax.del
Vue.prototype.$echarts = Echarts
Vue.prototype.$cookies = Cookies

Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.use(ElementUI)
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/*/*', redirect:to => {
      const cookies = Cookies.get('name')
      if (to.path) {
        if (cookies) {
          return '/*/*'
        } else {
          return '/Login'
        }
      } else {
        console.log(2)
      }
    }},
    { path: '/Login', component: Login },
    {
      path: '/Header',
      component: Header,
      children: [
        { path: '/', component: Home },
        { path: 'News', component: News }
      ]
    },
    { path: '*', component: Header }
  ]
})
