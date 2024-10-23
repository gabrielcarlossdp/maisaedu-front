import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    show: false,
    text: '',
    color: 'info',
    timeout: 3000,
  }),
  actions: {
    showSnackbar(options) {
      this.show = true
      this.text = options.text || ''
      this.color = options.color || 'info'
      this.timeout = options.timeout || 3000
    },
  },
})
