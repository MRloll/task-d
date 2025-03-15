import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import ar from '@/locales/ar'

export default createI18n({
  legacy: false, // مهم لاستخدام `composition API`
  locale: 'en', // اللغة الافتراضية
  fallbackLocale: 'en', // اللغة الاحتياطية
  messages: { en, ar },
})
