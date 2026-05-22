import 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: any
  }
}