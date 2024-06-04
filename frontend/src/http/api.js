import axios from 'axios'
export const API_URL = 'https://animila.ru/api'
const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})
api.interceptors.request.use(config => {
  return config
})

export default api
