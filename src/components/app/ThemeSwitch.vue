<template>
  <v-btn icon @click="switchTheme">
    <v-icon size="20">mdi-{{ themeIcon }}</v-icon>
  </v-btn>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const { global } = useTheme()

const themeIcon = computed(() =>
  global.current.value.dark ? 'weather-sunny' : 'moon-waning-crescent',
)

const switchTheme = () => {
  global.name.value = global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem('mode', global.name.value)
}
</script>

<style lang="scss" scoped></style>
