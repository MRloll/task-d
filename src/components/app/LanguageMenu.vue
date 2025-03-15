<script setup>
import { useLocale } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'

const { locale, availableLocales } = useI18n()
const vuetifyLocale = useLocale()
const appStore = useAppStore()

const flagImages = ref({})

const loadFlagImages = async () => {
  for (const loc of availableLocales) {
    const image = await import(`@/assets/images/svg/${loc}.svg?url`)
    flagImages.value[loc] = image.default
  }
}

const getFlagUrl = (locale) => flagImages.value[locale]

function switchLocale(lang) {
  vuetifyLocale.current.value = lang
  locale.value = lang
  appStore.locale.current = lang
  localStorage.setItem('locale', lang)
}

onMounted(() => loadFlagImages())
</script>

<template>
  <v-menu key="language-menu" close-delay="100" location="bottom end" open-delay="60">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon path="languages" class="px-1 me-2">
        <div class="d-flex justify-center align-center">
          <img :src="getFlagUrl(locale)" width="24" :alt="`${locale} flag`" />
        </div>
      </v-btn>
    </template>

    <v-sheet class="overflow-hidden language_wrapper" rounded>
      <v-list :lines="false" density="compact" nav min-width="125">
        <v-list-item
          v-for="(item, i) in availableLocales"
          :key="i"
          :value="item"
          color="primary"
          @click="switchLocale(item)"
          class="d-flex justify-space-between align-center"
        >
          <template v-slot:append>
            <img :src="getFlagUrl(item)" width="16" :alt="`${item} flag`" />
          </template>
          <span class="language_option mx-2">
            {{ $t(item) }}
          </span>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>
