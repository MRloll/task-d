<script lang="ts" setup>
import LanguageMenu from '../app/LanguageMenu.vue'
import ThemeSwitch from '../app/ThemeSwitch.vue'
import { useUsersStore } from '@/modules/users/store/users'
const { changeUserRole } = useUsersStore()
</script>

<template>
  <v-app-bar color="surface-light" flat name="app-bar" class="px-10">
    <div class="d-flex align-center ga-2">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-avatar size="36px" v-bind="props">
            <v-img
              alt="Avatar"
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            ></v-img>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item @click="changeUserRole('admin')">
            <v-list-item-title>{{ $t('admin') }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeUserRole('editor')">
            <v-list-item-title>{{ $t('editor') }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeUserRole('viewer')">
            <v-list-item-title>{{ $t('viewer') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <LanguageMenu />
      <ThemeSwitch />
    </div>
  </v-app-bar>
</template>
