import toast from './src'

export default {
  install(Vue) {
    Vue.prototype.$toast = toast
  },
  toast
}
