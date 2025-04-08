import moment from 'moment'
import { makeAutoObservable } from 'mobx'
import { ErrorTypesEnum } from '../types/errorTypes'

// types
import type { AxiosError, CustomErrorEvent, CustomError } from '../types/errorTypes'
import type { Alert } from '../types'

class GeneralStore {
  alerts: Alert[] = []
  errors: CustomError[] = []
  fetching: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  addAlert(alert: Alert): void {
    this.alerts.push(alert)
  }

  removeAlert(index: number): void {
    this.alerts.splice(index, 1)
  }

  addError(error: CustomError): void {
    this.errors.push(error)
  }

  removeError(index: number): void {
    this.errors.splice(index, 1)
  }

  setFetching(value: number): void {
    if (value >= 0) {
      this.fetching = value
    }
  }

  startFetching(): void {
    ++this.fetching
  }

  stopFetching(): void {
    if (this.fetching > 0) {
      --this.fetching
    }
  }

  onActionFailure(errorEvent: ErrorEvent | CustomErrorEvent, errorType: ErrorTypesEnum = ErrorTypesEnum.WARNING): void {
    this.addError({
      error: { ...errorEvent },
      type: errorType,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    if (process.env.NODE_ENV === 'development') {
      console.error(errorEvent.message, errorType);
    }
  }

  onRequestFailure(error: AxiosError, errorType: ErrorTypesEnum = ErrorTypesEnum.WARNING): void {
    const { message, response, stack } = error;
    if (message === 'Network Error' || response?.status === 401) { // ignore connection lost and 401 cause it is probably just unsuccessful authentication...
      return
    }

    this.addError({
      error: { ...error, message, response, stack },
      type: errorType,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
    if (process.env.NODE_ENV === 'development') {
      console.error(error.message, errorType)
    }
  }
}

const generalStore = new GeneralStore()
export default generalStore
