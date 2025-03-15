<script lang="ts" setup>
import MainAside from '@/components/layout/MainAside.vue'
import MainNav from '@/components/layout/MainNav.vue'
import MainFooter from '@/components/layout/MainFooter.vue'
</script>

<template>
  <v-layout ref="app" class="h-100">
    <MainNav />

    <MainAside />

    <v-main>
      <v-container>
        <Suspense>
          <router-view></router-view>
        </Suspense>
      </v-container>
    </v-main>
    <MainFooter />
  </v-layout>
</template>
