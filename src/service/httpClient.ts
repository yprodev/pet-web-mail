import axios, { AxiosRequestConfig } from 'axios'

const clientHTTPConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3004/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
}

const HttpClient = axios.create(clientHTTPConfig)

HttpClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default HttpClient
