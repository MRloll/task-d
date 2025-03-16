<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAlertStore } from '@/stores/alert'
const { alert, alertMessage, alertType } = storeToRefs(useAlertStore())
</script>
<template>
  <div class="text-center">
    <v-snackbar close-on-content-click v-model="alert" :color="alertType" location="right top">
      <div class="ga-2 pa-3" :class="Array.isArray(alertMessage) ? 'd-block mt-3' : 'd-flex '">
        <v-icon v-if="alertType === 'success'">mdi-check</v-icon>
        <v-icon v-else>mdi-alert</v-icon>
        <template v-if="Array.isArray(alertMessage)">
          <div>
            <p v-for="message in alertMessage" :key="message">
              {{ message }}
            </p>
          </div>
        </template>
        <p v-else>{{ alertMessage }}</p>
      </div>
    </v-snackbar>
  </div>
</template>

<style scoped></style>
