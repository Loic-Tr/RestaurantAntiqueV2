import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createBootstrap, Components, Directives } from 'bootstrap-vue-next'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

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
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
})
app.mount('#app')
