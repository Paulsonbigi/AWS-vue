import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/Signup'
import AlbumsPage from '../views/AlbumsPage'
import AlbumDetailPage from '../views/AlbumDetailPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUp 
  },
  {
    path: '/album/:id',
    name: 'AlbumDetailPage',
    component: AlbumDetailPage,
    meta: {requireAuth: true}
  },
  {
    path: '/albums',
    name: 'AlbumsPage',
    component: AlbumsPage,
    meta:{ requireAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
