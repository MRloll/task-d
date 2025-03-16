import { useUsersStore } from '@/modules/users/store/users'
import { storeToRefs } from 'pinia'

export default function permissionsMiddleware(to, from, next) {
  const { currentuser } = storeToRefs(useUsersStore())
  const userPermissions = currentuser.value.permissions

  const requiredPermissions = to.meta.permissions as string[] | undefined
  if (requiredPermissions) {
    const hasPermission = requiredPermissions.some((perm) => userPermissions.includes(perm))

    if (!hasPermission) {
      return next('/not-allowed')
    }
  }

  next()
}
