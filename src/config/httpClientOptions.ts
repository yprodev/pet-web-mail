import { AxiosRequestConfig } from 'axios'

const clientHTTPConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3004/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
}

export default clientHTTPConfig
