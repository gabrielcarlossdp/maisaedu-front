import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

axiosInstance.interceptors.request.use(
  function (config) {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
      config.headers.Authorization = 'Bearer ' + user.token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default {
  install(app) {
    app.config.globalProperties.$axios = axiosInstance
  },
}
