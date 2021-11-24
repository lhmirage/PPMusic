import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import("../views/Login")

const routes = [
  {
    path: "/login",
    component: Login
  }
]

const router = new VueRouter({
  routes: routes
})

export default router