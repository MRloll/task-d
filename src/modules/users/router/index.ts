export default [
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/Users.vue'),
    meta: {
      permissions: ['create_user', 'edit_user', 'delete_user', 'read_user'],
    },
  },
  {
    path: '/users/:id',
    name: 'show-user',
    component: () => import('../views/Show.vue'),
    meta: {
      permissions: ['read_user', 'edit_user'],
    },
  },
]
