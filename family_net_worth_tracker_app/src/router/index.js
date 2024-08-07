import { createRouter, createWebHistory } from 'vue-router'
//import LoginPage from '../views/LoginPage.vue'
//import HelloWorld from '../views/HelloWorld.vue'

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import(/* webpackChunkName: "about" */ '../views/HelloWorld.vue')  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
