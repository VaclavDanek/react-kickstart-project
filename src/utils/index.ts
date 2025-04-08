import { ErrorTypesEnum } from '../types/errorTypes'

// stores
import GeneralStore from '../stores/GeneralStore'

// types
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export const requestInterceptor = [
  (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    GeneralStore.startFetching();
    return request;
  },
  (error: any): Promise<any> => {
    GeneralStore.onRequestFailure(error);
    return Promise.reject(error);
  }
]

export const responseInterceptor = [
  (response: AxiosResponse): AxiosResponse => {
    GeneralStore.stopFetching();
    return response;
  },
  (error: any): Promise<any> => {
    GeneralStore.stopFetching();
    let errorType: ErrorTypesEnum = ErrorTypesEnum.WARNING;
    switch (error?.response?.status) {
      case 500:
      case 403:
        errorType = ErrorTypesEnum.CRITICAL;
        break
      case 401:
        errorType = ErrorTypesEnum.INFO; // probably just wrong authentication credentials
    }
    GeneralStore.onRequestFailure(error, errorType);
    return Promise.reject(error);
  }
]

export { default as withRouter } from './withRouter'