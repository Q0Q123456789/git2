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
Vue.prototype.$Router = Router

Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.use(ElementUI)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/Login', component: Login },
    {
      path: '/',
      component: Header,
      children: [
        { path: '/', component: Home },
        { path: '/News', component: News }
      ],
      meta: {
        title: '',
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    { path: '*',
      component: Header,
      meta: {
        title: '',
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token = Cookies.get('key')
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (token) { // 判断当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
