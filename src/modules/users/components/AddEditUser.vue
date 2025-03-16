<script setup lang="ts">
import GenericForm from '@/components/common/GenericForm.vue'
import Modal from '@/components/common/Modal.vue'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { setValuesToSchema, transfromSchemaToObject } from '@/utils/formDataUtils'
import { useUsersStore } from '../store/users'
import { useField } from '@/composables/useField'

const { createTextField, createSelectField, createTextareaField } = useField()
const modelValue = defineModel<boolean>('modelValue')
const props = defineProps<{ isCreate: boolean }>()
const usersStore = useUsersStore()
const { updateItem } = usersStore
const { itemToUpdate } = storeToRefs(usersStore)

const form = ref<any>(null)
const btnLoading = ref(false)

const schema = ref([
  createTextField({
    filedKey: 'first_name',
    label: 'first_name',
    cols: { md: 12 },
    value: '',
    icon: 'account',
    required: true,
  }),
  createTextField({
    filedKey: 'last_name',
    label: 'first_name',
    cols: { md: 12 },
    value: '',
    required: true,
    icon: 'account',
  }),
  createTextField({
    filedKey: 'email',
    label: 'email',
    cols: { md: 12 },
    value: '',
    required: true,
    icon: 'mail',
  }),

  createSelectField({
    filedKey: 'role',
    label: 'role',
    cols: { md: 12 },
    value: '',
    itemTitle: 'title',
    itemValue: 'value',
    required: true,
    options: [
      {
        value: 'admin',
        title: 'Admin',
      },
      {
        value: 'editor',
        title: 'Editor',
      },
      {
        value: 'viewer',
        title: 'Viewer',
      },
    ],
  }),
  createTextareaField({
    filedKey: 'brief',
    label: 'brief',
    cols: { md: 12 },
    value: '',
    icon: 'eye',
    required: true,
  }),
])

const callUpdateUser = async () => {
  try {
    await form.value.validate()
    btnLoading.value = true
    await updateItem(itemToUpdate.value?.id, transfromSchemaToObject(schema.value))
    btnLoading.value = false
    modelValue.value = false
  } catch (error) {
    console.error(error)
  }
}
watch(
  () => modelValue.value,
  () => {
    if (modelValue.value && !props.isCreate) {
      setValuesToSchema(schema.value, itemToUpdate.value)
    }
  },
)
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <Modal title="add_user" v-model="modelValue">
      <template #content>
        <GenericForm ref="form" :schema="schema"> </GenericForm>
      </template>

      <template #actions>
        <v-btn flat color="primary" @click="modelValue = false"> {{ $t('cancel') }} </v-btn>
        <v-btn
          flat
          color="primary"
          :loading="btnLoading"
          :disabled="btnLoading"
          @click="callUpdateUser"
        >
          {{ $t('save') }}
        </v-btn>
      </template>
    </Modal>
  </div>
</template>
