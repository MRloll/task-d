<script setup lang="ts">
import { type Field } from '@/types'

const modelValue = defineModel('modelValue')

defineProps<Field>()
</script>

<template>
  <div class="field">
    <div v-if="label">
      {{ label }}
    </div>
    <v-textarea
      :id="id"
      hide-details="auto"
      outlined
      v-model="modelValue"
      :placeholder="placeholder"
      :rules="rules"
      :disabled="disabled"
      dense
      :clearable="clearable"
    >
      <template v-if="icon" v-slot:prepend-inner>
        <v-icon>mdi-{{ icon }}</v-icon>
      </template>
    </v-textarea>
  </div>
</template>
