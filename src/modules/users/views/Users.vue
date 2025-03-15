<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useField } from '@/composables/useField'
import { setValuesToSchema, transfromSchemaToObject } from '@/utils/formDataUtils'
import GenericForm from '@/components/common/GenericForm.vue'
const { createTextField, createSelectField, createTextareaField } = useField()

const schema = ref([
  createTextField({
    filedKey: 'first_name',
    label: 'labels.first_name',
    cols: { md: 12, lg: 6 },
    value: '',
    icon: 'eye',
    required: true,
  }),
  createSelectField({
    filedKey: 'last_name',
    label: 'labels.last_name',
    cols: { md: 12, lg: 6 },
    value: '',
    itemTitle: 'title',
    itemValue: 'value',
    required: true,
    options: [
      {
        value: '1',
        title: 'title',
      },
    ],
  }),
  createTextareaField({
    filedKey: 'brief',
    label: 'labels.brief',
    cols: { md: 12, lg: 6 },
    value: '',
    icon: 'eye',
    required: true,
  }),
  {
    type: 'slot',
    cols: { md: 12, lg: 6 },
    filedKey: 'association_name',
  },
])

const fromData = {
  first_name: 'dasd',
  last_name: 'asd',
  brief: 'asd',
}

const form: Ref<any> = ref(null)

setValuesToSchema(schema.value, fromData)
</script>
<template>
  <div>
    <GenericForm ref="form" :schema="schema">
      <template #association_name>
        <v-btn @click="form.reset()">ss</v-btn>
      </template>
    </GenericForm>
  </div>
</template>

<style lang="scss" scoped></style>
