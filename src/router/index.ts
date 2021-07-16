import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/index.vue'
import address from '../components/address.vue'
import login from '../components/login.vue'
import forget from '../components/forget.vue'

Vue.use(VueRouter)
/* const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err: any) => err)
} */
const routes = [
  {
    path: '/',
    component: address,
  },
  {
    name: 'login',
    component: login,
    path: '/login',
  },
  {
    name: 'address',
    component: address,
    path: '/address',
  },
  {
    name: 'index',
    component: index,
    path: '/index',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../components/index/home.vue')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('../components/index/search.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../components/index/order.vue')
      },
      {
        path: '/personal',
        name: 'personal',
        component: () => import('../components/index/personal.vue')
      },
    ]
  },
  {
    name: 'forget',
    component: forget,
    path: 'forget',
  },
  {
    name: 'city',
    component: () => import('../components/city.vue'),
    path: '/city',
  },
  {
    name: 'retail',
    component: () => import('../components/shop/retail.vue'),
    path: '/retail',
  },
  {
    name: 'permessage',
    component: () => import('../components/index/permessage.vue'),
    path: '/permessage',
    meta: { isAuth: true },
  },
  {
    name: 'addadres',
    component: () => import('../components/index/addadres.vue'),
    path: '/addadres',
    meta: { isAuth: true },
  },
  {
    name: 'add',
    path: '/add',
    meta: { isAuth: true },
    component: () => import('../components/index/add.vue')
  },
  {
    name: 'svip',
    path: '/svip',
    meta: { isAuth: true },
    component: () => import('../components/index/svip.vue')
  },
  {
    name: 'usecart',
    path: '/usecart',
    meta: { isAuth: true },
    component: () => import('../components/index/usecart.vue')
  },
  {
    name: 'redpacket',
    path: '/redpacket',
    meta: { isAuth: true },
    component: () => import('../components/index/redpacket.vue')
  },
  {
    name: 'hisredpack',
    path: '/hisredpack',
    meta: { isAuth: true },
    component: () => import('../components/index/hisredpack.vue')
  },
  {
    name: 'service',
    path: '/service',
    component: () => import('../components/index/service.vue')
  },
  {
    name: 'questiondetail',
    path: '/questiondetail',
    component: () => import('../components/index/questiondetail.vue')
  },
  {
    name: 'balance',
    path: '/balance',
    meta: { isAuth: true },
    component: () => import('../components/index/balance.vue')
  },
  {
    name: 'integral',
    path: '/integral',
    meta: { isAuth: true },
    component: () => import('../components/index/integral.vue')
  },
  {
    name: 'classify',
    path: '/classify',
    component: () => import('../components/shop/classify.vue')
  },
  {
    name: 'download',
    path: '/download',
    component: () => import('../components/index/download.vue')
  },
  {
    name: 'coinred',
    path: '/coinred',
    meta: { isAuth: true },
    component: () => import('../components/index/coinred.vue')
  },
  {
    name: 'goods',
    path: '/goods',
    component: () => import('../components/shop/goods.vue')
  },
  {
    name: 'recommend',
    path: '/recommend',
    component: () => import('../components/shop/recommend.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(function (to: any, from: any, next: any) {
  if (to.meta.isAuth) {
    if (sessionStorage.getItem('store')) {
      next();
    }
  } else {
    next();
  }
})

export default router
