import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type User } from '@/types'
import { fetchUsers, updateUser, deleteUser, fetchUserById, createUser } from '@/mockApi'
import { useAlertStore } from '@/stores/alert'
import { useI18n } from 'vue-i18n'

export const useUsersStore = defineStore('users', () => {
  // =================
  // NOTE:STATE
  // =================
  const { t } = useI18n()
  const { showSuccessAlert, showErrorAlert } = useAlertStore()
  const loading = ref(false)
  const params = ref({
    page: 1,
    limit: 10,
    search: '',
    sortBy: { key: 'name', order: 'asc' },
  })
  const itemToUpdate = ref({} as User)
  const usersData = ref({
    data: [],
    total: 0,
    page: 1,
    itemsPerPage: 10,
    sortBy: { key: 'email', order: 'asc' },
  } as {
    data: User[]
    total: number
    page: number
    itemsPerPage: number
    search?: string
  })

  const headers = ref([
    {
      title: 'Name',
      key: 'name',
      sortable: false,
    },
    {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      sortable: false,
    },
  ])

  const roles = ref({
    admin: ['create_user', 'edit_user', 'delete_user', 'read_user', 'view_reports', 'manage_roles'],
    editor: ['edit_user', 'create_user', 'delete_user'],
    viewer: ['view_reports'],
  })

  const currentuser = ref({
    permissions: roles.value.admin,
  })

  // =================
  // NOTE: Actions
  // =================

  const changeUserRole = (role: string) => {
    currentuser.value.permissions = roles.value[role as keyof typeof roles]
  }

  const getUsers = async (params: any) => {
    try {
      loading.value = true
      const response = await fetchUsers({ ...params })
      usersData.value = response
      loading.value = false
    } catch (error) {
      console.error(error)
    }
  }

  const updateItem = async (id: number, data: Partial<User>) => {
    try {
      const user = await updateUser(id, data)
      showSuccessAlert(t('user_updated_successfully'))
      const index = usersData.value.data.findIndex((u) => u.id === id)
      if (index !== -1) {
        usersData.value.data[index] = user
      }
      itemToUpdate.value = user
      console.log(user)
    } catch (error) {
      showErrorAlert(t('error_updating_user'))
    }
  }

  const deleteItem = async (id: number) => {
    try {
      await deleteUser(id)
      usersData.value.data = usersData.value.data.filter((u) => u.id !== id)
      showSuccessAlert(t('user_deleted_successfully'))
    } catch (error) {
      showErrorAlert(t('error_deleting_user'))
    }
  }

  const getSingleUser = async (id: number): Promise<User | undefined> => {
    try {
      const response = await fetchUserById(id)
      itemToUpdate.value = response
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const addUser = async (data: User) => {
    try {
      const response = await createUser(data)
      showSuccessAlert(t('user_created_successfully'))
      usersData.value.data.unshift(response)
      return response
    } catch (error) {
      showErrorAlert(t('error_creating_user'))
    }
  }
  return {
    params,
    usersData,
    headers,
    loading,
    getUsers,
    itemToUpdate,
    updateItem,
    deleteItem,
    getSingleUser,
    addUser,
    changeUserRole,
    currentuser,
  }
})
