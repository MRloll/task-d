import { createRouter, createWebHistory } from 'vue-router'
import Users from '../modules/users/views/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: '',
          name: 'users',
          component: Users,
        },
      ],
    },
  ],
})

export default router
