<script setup lang="ts">
import { type Field } from '@/types'

const modelValue = defineModel('modelValue')

defineProps<Field>()
</script>

<template>
  <div class="field">
    <div v-if="label">{{ label }}</div>
    <v-text-field
      :id="id"
      hide-details="auto"
      v-model="modelValue"
      :placeholder="placeholder"
      :rules="rules"
      :disabled="disabled"
      :clearable="clearable"
    >
      <template v-if="icon" v-slot:prepend-inner>
        <v-icon>mdi-{{ icon }}</v-icon>
      </template>
    </v-text-field>
  </div>
</template>
