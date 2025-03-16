<script lang="ts" setup></script>

<template>
  <v-navigation-drawer location="end" name="drawer" permanent>
    <div class="h-100">
      <v-list>
        <v-list-item v-has-permission="['read_reports']" :to="{ name: 'reports' }" exact>
          <v-list-item-title>{{ $t('reports') }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-has-permission="['create_user', 'edit_user', 'delete_user', 'read_user']"
          :to="{ name: 'users' }"
        >
          <v-list-item-title>{{ $t('users') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>
