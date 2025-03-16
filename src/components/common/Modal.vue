<template>
  <v-dialog max-width="500" v-model="modelValue" scrollable>
    <v-card>
      <v-card-title>
        <div class="d-flex align-center">
          <h5>{{ $t(title) }}</h5>
          <v-spacer></v-spacer>
          <v-btn flat icon="mdi-close" @click="modelValue = false"></v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>

      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const modelValue = defineModel<boolean>('modelValue')
defineProps<{ title: string }>()
</script>

<style lang="scss" scoped></style>
