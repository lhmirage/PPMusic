import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import("../views/Login")
const Register = () => import("../views/Register")
const Home = () => import("../views/Home")
const Rank = () => import("../views/Rank")
const SongSheet = () => import("../views/SongSheet")
const Singer = () => import("../views/Singer")
const Video = () => import("../views/Video")
const MV = () => import("../views/MV")
const Search = () => import("../views/Search")
const PlayListDetail = () => import("../views/PlayListDetail")

const Profile = () => import("../views/Profile")

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/rank",
    component: Rank
  },
  {
    path: "/song_sheet",
    component: SongSheet
  },
  {
    path: "/singer",
    component: Singer
  },
  {
    path: "/video",
    component: Video
  },
  {
    path: "/mv",
    component: MV
  },
  {
    path: "/play-list-detail/:id",
    component: PlayListDetail
  },
  {
    path: "/profile",
    component: Profile
  },
]

const router = new VueRouter({
  routes: routes
})

export default router