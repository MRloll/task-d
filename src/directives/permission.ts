import { hasPermission } from '@/utils/hasPermission'
import { useUsersStore } from '@/modules/users/store/users'
import { storeToRefs } from 'pinia'

const permissionDirective = {
  mounted(el: HTMLElement, binding: any) {
    const { currentuser } = storeToRefs(useUsersStore())
    const userPermissions = currentuser.value.permissions

    if (!hasPermission(userPermissions, binding.value)) {
      el.style.display = 'none'
    }
  },
}

export default permissionDirective
