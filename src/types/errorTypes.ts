// types
import type { AxiosError as AxiosErrorType } from 'axios'

export enum ErrorTypesEnum {
  INFO = 0,
  WARNING = 1,
  CRITICAL = 2,
}

export interface CustomErrorEvent {
  message: string;
  stack: any;
  [key: string]: any;
}

export interface CustomError {
  error: ErrorEvent | CustomErrorEvent;
  type: ErrorTypesEnum;
  timestamp: string;
}

export interface AxiosError extends AxiosErrorType {
  stack: string;
}
