import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
Vue.use(Router)

export const constantRouterMap = [
  { path: '/', redirect: '/home' },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },

  {
    path: '/home',
    component: Layout,
    children: [
      { path: '', component: () => import('@/views/home/index'), name: 'home', meta: { title: 'home', role: false }}
    ]
  },
  // 404路由
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  routes: constantRouterMap
})
