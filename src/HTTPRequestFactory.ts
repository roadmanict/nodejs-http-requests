import {HTTPRequest} from './HTTPRequest';

export interface HTTPRequestFactory {
  create: <T>(parameters: any) => HTTPRequest<T>;
}