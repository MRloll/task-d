import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type User } from '@/types'
import { fetchUsers, updateUser, deleteUser } from '@/mockApi'
import { useAlertStore } from '@/stores/alert'
import { useI18n } from 'vue-i18n'
import { id } from 'vuetify/lib/locale/index.mjs'

export const useUsersStore = defineStore('users', () => {
  // =================
  // NOTE:STATE
  // =================
  const { t } = useI18n()
  const { showSuccessAlert, showErrorAlert } = useAlertStore()

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
  const loading = ref(false)

  // =================
  // NOTE: Actions
  // =================
  const getUsers = async (params: any) => {
    try {
      loading.value = true
      console.log(params)
      const response = await fetchUsers(params)
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
  return { params, usersData, headers, loading, getUsers, itemToUpdate, updateItem, deleteItem }
})
