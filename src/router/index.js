import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = () => import('../pages/login.vue')
const index = () => import('../pages/index.vue')

//管理员
const manage = () => import('../pages/manage.vue')
//轮播图
const banner = () => import('../pages/banner.vue')

//普通管理员
const useradmin = () => import('../pages/useradmin.vue')

//商品
const wares = () => import('../pages/wares.vue')

//用户
const user = () => import('../pages/user.vue')
//欢迎页
const welcome = () => import('../pages/welcome.vue')

//管理员修改密码
const updateManage = () => import('../pages/updateManage.vue')

//类型
const type=()=>import('../pages/type.vue')

//用户收藏
const collection=()=>import('../pages/collection.vue')

// 订单
const buy=()=>import('../pages/buy.vue')

// 加入购物车
const cart =()=>import('../pages/cart.vue')

// 商品点赞管理
const point=()=>import('../pages/point.vue')

// 用户收货地址
const address=()=>import('../pages/address.vue')
export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: 'welcome',
          component: welcome
        },
        {
          path: 'manage',
          name: '管理员管理',
          component: manage
        },
        {
          path: 'banner',
          name: 'banner管理',
          component: banner
        },{
          path: 'type',
          name: '类型管理',
          component: type
        },
        {
          path: 'useradmin',
          name: '普通管理员',
          component: useradmin
        },
        {
          path: 'wares',
          name: '商品管理',
          component: wares
        },
        {
          path: 'user',
          name: '用户管理',
          component: user
        },
        {
          path:'collection',
          component:collection,
          name:'用户收藏管理'
        },
        {
          path:'point',
          component:point,
          name:'商品点赞管理'
        },
      
        {
          path:'address',
          component:address,
          name:'用户收货地址管理'
        },
        {
          path:'buy',
          component:buy,
          name:'用户订单管理'
        },
        {
          path:'cart',
          component:cart,
          name:'用户加入购物车管理'
        },
        {
          path: 'updateManage',
          name: '管理员修改密码',
          component: updateManage
        },
        {
          path: '',
          redirect: 'welcome'
        }
      ]
    },
    {
      path: '*',
      redirect: 'login'
    }
  ]
})
