import { createApp } from 'vue/dist/vue.runtime.esm-bundler'
import App from './App.vue'
import router from './router'
import i18n from "./lang"

import "@/assets/main.css"

createApp(App).
use(router).
use(i18n).
mount('#app')