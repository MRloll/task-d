<script lang="ts" setup>
import { ref } from 'vue'
import Alert from '@/components/app/Alert.vue'
import { storeToRefs } from 'pinia'
import { onBeforeMount, watch } from 'vue'
import { useLocale } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { useTheme } from 'vuetify'
import { useUsersStore } from './modules/users/store/users'
const { currentuser } = storeToRefs(useUsersStore())
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

const key = ref(0)
watch(
  () => currentuser.value,
  () => {
    key.value++
  },
  { deep: true },
)
</script>

<template>
  <Alert />
  <RouterView :key="key" />
</template>

<style scoped></style>
