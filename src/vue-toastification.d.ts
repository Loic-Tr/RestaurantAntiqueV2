import 'vue-toastification'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: any
  }
}