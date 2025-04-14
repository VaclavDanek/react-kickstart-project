import axios from 'axios'

// utils
import { requestInterceptor, responseInterceptor } from '../utils'

// types
import type { AxiosBasicCredentials, AxiosInstance, AxiosResponse } from 'axios'

export const apis = {
  example: axios.create({
    baseURL: `https://api.agify.io`,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }),
} satisfies Record<string, AxiosInstance>

Object.values(apis).forEach((api: AxiosInstance) => api.interceptors.request.use(...requestInterceptor))
Object.values(apis).forEach((api: AxiosInstance) => api.interceptors.response.use(...responseInterceptor))

export const setHeader = (apiKey: keyof typeof apis, header: string, value?: string | string[] | null): void => {
  if (value) { apis[apiKey].defaults.headers.common[header] = value } else { delete apis[apiKey].defaults.headers.common[header] }
}

export const setGlobalHeader = (header: string, value?: string | string[] | null): void => {
  if (value) { axios.defaults.headers.common[header] = value } else { delete axios.defaults.headers.common[header] }
}

export const setBasicAuth = (apiKey: keyof typeof apis, credentials?: AxiosBasicCredentials | null): void => {
  if (credentials) { apis[apiKey].defaults.auth = credentials } else { delete apis[apiKey].defaults.auth }
}

export const setGlobalBasicAuth = (credentials?: AxiosBasicCredentials | null): void => {
  if (credentials) { axios.defaults.auth = credentials } else { delete axios.defaults.auth }
}

const endpoints = {
  // post

  // put

  // get
  getPredictedAge: (name: string, country_id?: string, max_age?: number): Promise<AxiosResponse<AgifyResponse>> => 
    apis.example.get(`/`, { params: { name, country_id, max_age } }),

  // delete
} satisfies Record<string, (...args: any[]) => Promise<AxiosResponse>>

export default endpoints
