import Vue from 'vue'
import toastVue from './toast.vue'

const ToastConstructor = Vue.extend(toastVue)

const defaults = {
  text: null,
  duration: 1500
}

ToastConstructor.prototype.close = function() {
  if (this.$el && this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el)
  }
  this.$destroy()
  this.visible = false
}

const Toast = (options = {}) => {
  options = Object.assign({}, defaults, options)
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target)
  }
  options.target = options.target || document.body

  const parent = options.body ? document.body : options.target
  const instance = new ToastConstructor({
    el: document.createElement('div'),
    data: options
  })
  parent.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.visible = true
  })
  setTimeout(() => {
    instance.close()
  }, options.duration)
  return instance
}

export default Toast
