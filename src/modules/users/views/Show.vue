<script lang="ts" setup>
import AddEditUser from '../components/AddEditUser.vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useUsersStore } from '../store/users'
const usersStore = useUsersStore()
const { getSingleUser } = usersStore
const { itemToUpdate } = storeToRefs(usersStore)

const showModal = ref(false)
const route = useRoute()
await getSingleUser(Number(route.params.id))

const setEditUser = () => {
  showModal.value = true
}
</script>

<template>
  <div>
    <AddEditUser v-model="showModal" :is-create="false" />
    <v-btn size="small" color="primary" flat icon="mdi-pencil-outline" @click="setEditUser"></v-btn>
    <div>
      <v-table>
        <tbody>
          <tr>
            <td>{{ $t('name') }}</td>
            <td>{{ itemToUpdate?.first_name + ' ' + itemToUpdate?.last_name }}</td>
          </tr>
          <tr>
            <td>{{ $t('email') }}</td>
            <td>{{ itemToUpdate?.email }}</td>
          </tr>
          <tr>
            <td>{{ $t('role') }}</td>
            <td>{{ itemToUpdate?.role }}</td>
          </tr>
          <tr>
            <td>{{ $t('biref') }}</td>
            <td>{{ itemToUpdate?.brief }}</td>
          </tr>
          <tr>
            <td>{{ $t('permission') }}</td>
            <td>
              <v-chip v-for="permission in itemToUpdate?.permissions" :key="permission">
                {{ permission }}
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
