import axios from 'axios'

export const $axios = axios.create({
  baseURL: 'https://super-tutor123.herokuapp.com/api',

  timeout: 1000,
})

// TODO:refresh token ko kaam garna baaki xa
$axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accesstoken')
  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`
  }
  return config
})
