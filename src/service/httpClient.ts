import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

const initializeHttpClient = (config: AxiosRequestConfig): AxiosInstance => {
  const httpClient = axios.create(config)

  return httpClient
}

export default initializeHttpClient
