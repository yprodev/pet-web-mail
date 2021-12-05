import axios from 'axios'
import { InitHttpClient } from '../types'

const initHttpClient: InitHttpClient = (config) => {
  const httpClient = axios.create(config)

  return httpClient
}

export default initHttpClient
