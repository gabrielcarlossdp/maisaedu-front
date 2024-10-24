import { defineStore } from 'pinia'
const user = JSON.parse(localStorage.getItem('user'))

const initialState = user
  ? { name: user.user.name, email: user.user.email, token: user.token }
  : { name: null, email: null, token: null }

export const useUserStore = defineStore('user', {
  state: () => initialState,

  actions: {
    setUser(user) {
      this.name = user.name
      this.email = user.email
    },
    setToken(token) {
      this.token = token
    },
    logout() {
      this.name = null
      this.email = null
      this.token = null
    },
  },
})
