import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import Register from '../components/register'
import User from '../components/user'
import testCase from '../components/testcase'
Vue.use(Router)
const routes = [
  {
    path: "/",
    redirect: "/register"
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/home",
    component: Home,
    children: [
      { path: '/user', component: User },
      { path: '/testcase', component: testCase}
    ] 
  } 
]
const router = new Router({
  routes
})
export default router