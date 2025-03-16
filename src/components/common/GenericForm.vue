<template>
  <VForm @submit.prevent="submit" ref="formRef">
    <v-row>
      <template v-for="(field, fieldIndex) in schema" :key="field.id">
        <v-col :lg="field?.cols?.lg" :md="field?.cols?.md">
          <slot v-if="field.type == 'slot'" :name="field.filedKey"></slot>
          <component
            v-else
            :is="getFieldComponent(field.type)"
            v-bind="{ ...field }"
            v-model="field.value"
          />
        </v-col>
      </template>
    </v-row>
    <slot name="submit"></slot>
  </VForm>
</template>

<script setup lang="ts">
import { type Field, type SelectField } from '@/types'
import { useFormValidation } from '@/composables/useFormValidation'
const { validate, reset: resetForm, formRef } = useFormValidation()

import textInput from '@/components/common/FieldsTypes/TextInput.vue'
import textArea from '@/components/common/FieldsTypes/textArea.vue'
import selectBox from '@/components/common/FieldsTypes/selectBox.vue'

const emit = defineEmits(['submit', 'updateSchema'])
const props = defineProps<{ schema: Field[] | SelectField[] }>()

const reset = () => {
  resetForm()
}

const getFieldComponent = (type) => {
  const components = {
    text: textInput,
    textarea: textArea,
    select: selectBox,
  }
  return components[type] || 'div'
}

const submit = async () => {
  await validate()
  emit('submit', props.schema)
}
defineExpose({ validate, submit, reset })
</script>
