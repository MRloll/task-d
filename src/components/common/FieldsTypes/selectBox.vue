<script setup lang="ts">
import { type SelectField } from '@/types'

const modelValue = defineModel('modelValue')

defineProps<SelectField>()
</script>

<template>
  <div class="field">
    <div v-if="label" class="field-label">{{ $t(label) }}</div>
    <div class="flex gap-2">
      <v-select
        :items="options"
        v-model="modelValue"
        :placeholder="placeholder"
        :multiple="multiple"
        :rules="rules"
        :item-value="itemValue"
        :item-title="itemTitle"
        :return-object="returnObject"
        hide-details="auto"
      />
    </div>
  </div>
</template>
