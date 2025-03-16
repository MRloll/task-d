import { createRouter, createWebHistory } from 'vue-router'
import Users from '@/modules/users/router'
import NotAllowed from '@/views/NotAllowed.vue'
import permissionsMiddleware from '@/middlewares/permissions'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layouts/default.vue'),
      children: [
        ...Users,
        {
          path: '',
          name: 'reports',
          component: () => import('@/views/reports.vue'),
          meta: {
            permissions: ['read_reports'],
          },
        },
      ],
    },
    { path: '/not-allowed', component: NotAllowed }, // صفحة عدم السماح
  ],
})

router.beforeEach((to, from, next) => {
  permissionsMiddleware(to, from, next)
})
export default router
