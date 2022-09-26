import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import Register from '../components/register'
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
    component: Home
  }
]
const router = new Router({
  routes
})
export default router