import { createRouter, createWebHistory } from 'vue-router'
import Users from '@/modules/users/router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layouts/default.vue'),
      children: [...Users],
    },
  ],
})

export default router
