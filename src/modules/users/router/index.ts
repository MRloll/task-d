export default [
  {
    path: '',
    name: 'users',
    component: () => import('../views/Users.vue'),
  },
  {
    path: '/users/:id',
    name: 'add-admin',
    component: () => import('../views/Show.vue'),
  },
]
