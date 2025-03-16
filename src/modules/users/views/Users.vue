<script lang="ts" setup>
import Modal from '@/components/common/Modal.vue'
import Table from '@/components/common/Table.vue'
import AddEditUser from '../components/AddEditUser.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '../store/users'
import type { User } from '@/types'

const usersStore = useUsersStore()
const { getUsers, deleteItem } = usersStore
const { usersData, loading, params, headers, itemToUpdate } = storeToRefs(usersStore)

const showModal = ref(false)
const showDeleteModal = ref(false)
const btnLoading = ref(false)
const isCreate = ref(true)

const setEditUser = (item: User) => {
  isCreate.value = false
  showModal.value = true
  itemToUpdate.value = item
}

const setDeleteUser = (item: User) => {
  itemToUpdate.value = item
  showDeleteModal.value = true
}

const callDeleteUser = async () => {
  btnLoading.value = true
  await deleteItem(itemToUpdate.value.id)
  btnLoading.value = false
  showDeleteModal.value = false
}

const showCreate = () => {
  showModal.value = true
  isCreate.value = true
}
</script>
<template>
  <div>
    <Modal title="delete_user" v-model="showDeleteModal">
      <template #content>
        <h4>{{ $t('are_you_sure') }}</h4>
      </template>
      <template #actions>
        <v-btn flat color="primary" @click="showDeleteModal = false"> {{ $t('cancel') }} </v-btn>
        <v-btn flat color="error" :loading="btnLoading" @click="callDeleteUser()">
          {{ $t('delete') }}
        </v-btn>
      </template>
    </Modal>
    <AddEditUser v-model="showModal" :is-create="isCreate" />
    <div class="d-flex justify-end mb-5">
      <v-btn
        v-has-permission="['create_user']"
        @click="showCreate()"
        size="small"
        color="primary"
        flat
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <Table
      v-has-permission="['create_user', 'edit_user', 'delete_user', 'read_user']"
      :total-items="usersData.total"
      :items-per-page="params.limit"
      :loadItems="getUsers"
      :serverItems="usersData.data"
      :search="params.search"
      :loading="loading"
      :headers="headers"
    >
      <template #actions="{ item }">
        <div class="d-flex align-center ga-3">
          <v-btn
            v-has-permission="['edit_user']"
            size="small"
            color="primary"
            flat
            icon="mdi-pencil-outline"
            @click="setEditUser(item)"
          ></v-btn>
          <v-btn
            v-has-permission="['delete_user']"
            size="small"
            color="error"
            flat
            icon="mdi-trash-can-outline"
            @click="setDeleteUser(item)"
          ></v-btn>
          <v-btn
            v-has-permission="['read_user']"
            size="small"
            color="secondary"
            :to="`/users/${item.id}`"
            flat
            icon="mdi-eye"
          ></v-btn>
        </div>
      </template>
    </Table>
  </div>
</template>

<style lang="scss" scoped></style>
