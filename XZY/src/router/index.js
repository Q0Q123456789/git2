import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import VueTouch from 'vue-touch'
import Echarts from 'echarts'

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

Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.use(ElementUI)
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/Login', component: Login },
    {
      path: '/Header',
      component: Header,
      children: [
        { path: 'Home', component: Home },
        { path: 'News', component: News }
      ]
    },
    { path: '*', component: Header }
  ]
})
