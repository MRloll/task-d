import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', {
  state: () => ({
    drawer: true,
    locale: {
      default: import.meta.env.VITE_LOCALE,
      current: 'ar',
    },
  }),
})
