<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  serverItems: any[]
  totalItems: number
  loading: boolean
  search: string
  itemsPerPage: number
  loadItems: any
  headers: any[]
}>()
const searchValue = ref('')
</script>

<template>
  <div>
    <v-data-table-server
      :items-per-page="itemsPerPage"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="loadItems"
      :headers="headers"
    >
      <template #item.name="{ item }"> {{ item.first_name + ' ' + item.last_name }}</template>
      <template #item.actions="{ item }">
        <slot name="actions" v-bind="{ item }"></slot>
      </template>
      <template v-slot:tfoot>
        <tr>
          <td>
            <v-text-field
              v-model="searchValue"
              @input=""
              class="ma-2"
              density="compact"
              placeholder="Search email..."
              hide-details
            ></v-text-field>
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </div>
</template>

<style lang="scss" scoped></style>
