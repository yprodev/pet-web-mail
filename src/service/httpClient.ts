import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { Observable, defer } from 'rxjs'
import { map } from 'rxjs/operators'

const clientHTTPConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3004/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
}

const initHttpClient = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create(config)

  return axiosInstance
}

const httpClient = initHttpClient(clientHTTPConfig)

const get = <T>(url: string, queryParams?: object): Observable<T> => {
  return defer(() => httpClient.get<T>(url, { params: queryParams })).pipe(
    map((result) => result.data)
  )
}

const post = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => httpClient.post<T>(url, body, { params: queryParams })).pipe(
    map((result) => result.data)
  )
}

const put = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => httpClient.put<T>(url, body, { params: queryParams })).pipe(
    map((result) => result.data)
  )
}

const patch = <T>(url: string, body: object, queryParams?: object): Observable<T | void> => {
  return defer(() => httpClient.patch<T>(url, body, { params: queryParams })).pipe(
    map((result) => result.data)
  )
}

const deleteR = <T>(url: string, id: number): Observable<T | void> => {
  return defer(() => httpClient.delete(`${url}/${id}`)).pipe(map((result) => result.data))
}

export { get, post, put, patch, deleteR }
