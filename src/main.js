import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createBootstrap, Components, Directives } from 'bootstrap-vue-next'


import './assets/custom.scss'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


const app = createApp(App)

app.use(router)

app.use(
  createBootstrap({
    components: Components,
    directives: Directives
  })
)

app.mount('#app')
