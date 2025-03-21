import './assets/main.css'
import permissionDirective from './directives/permission'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '@/plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import i18n from './plugins/i18n'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.directive('has-permission', permissionDirective)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)
app.mount('#app')
