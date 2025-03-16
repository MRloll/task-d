<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{
  serverItems: any[]
  totalItems: number
  loading: boolean
  search: string
  itemsPerPage: number
  loadItems: any
  headers: any[]
}>()
const searchQuery = ref('')
</script>

<template>
  <div>
    <v-text-field v-model="searchQuery" label="Search" prepend-inner-icon="mdi-magnify" clearable />
    <v-data-table-server
      :items-per-page="itemsPerPage"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="searchQuery"
      item-value="name"
      @update:options="loadItems"
      :headers="headers"
    >
      <template #item.name="{ item }"> {{ item.first_name + ' ' + item.last_name }}</template>
      <template #item.actions="{ item }">
        <slot name="actions" v-bind="{ item }"></slot>
      </template>
    </v-data-table-server>
  </div>
</template>

<style lang="scss" scoped></style>
