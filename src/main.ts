import { createApp } from 'vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import Toast, { type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import Popper from 'vue3-popper'

import App from './App.vue'
import router from './router'

import './styles/main.css'

const app = createApp(App)

app.component('ToolTip', Popper)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const toastOptions: PluginOptions = {
  // default toast options go here
}

app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
