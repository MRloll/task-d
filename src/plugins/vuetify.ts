import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ar } from 'vuetify/locale'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {},
      },
      dark: {
        colors: {},
      },
    },
  },
  locale: {
    locale: 'ar',
    fallback: 'ar',
    messages: { ar },
  },
})

export default vuetify
