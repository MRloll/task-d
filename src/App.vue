<script lang="ts" setup>
import Alert from '@/components/app/Alert.vue'
import { onBeforeMount } from 'vue'
import { useLocale } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { useTheme } from 'vuetify'

const { locale } = useI18n()
const vuetifyLocale = useLocale()
const appStore = useAppStore()
const { global } = useTheme()

onBeforeMount(() => {
  const local: string = localStorage.getItem('locale') || import.meta.env.VITE_LOCALE
  localStorage.setItem('locale', local)
  vuetifyLocale.current.value = local
  locale.value = local
  appStore.locale.current = local
  global.name.value = localStorage.getItem('mode') || import.meta.env.VITE_MODE
})
</script>

<template>
  <Alert />
  <RouterView />
</template>

<style scoped></style>
