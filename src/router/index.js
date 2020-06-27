import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const order = () => import('@comp/order')
const evaluate = () => import('@comp/evaluate')
const works = () => import('@comp/works')
const member = () => import('@comp/member')
const Stylist = () => import('@comp/Stylist')
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect:'Home'
    },{
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {path:'',redirect:'order'},
        {path:'order',name:'order',component:order,},
        {path:'evaluate',name:'evaluate',component:evaluate,},
        {path:'works',name:'works',component:works,},
        {path:'member',name:'member',component:member,},
        {path:'Stylist',name:'Stylist',component:Stylist,},
      ]
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]

const router = new VueRouter({
  routes
})

export default router
