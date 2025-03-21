import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vue3',
      name: 'vue3',
      component: () => import('../views/vue3.vue')
    },
    {
      path: '/react',
      name: 'react',
      component: () => import('../views/react.vue')
    }
  ]
})

export default router