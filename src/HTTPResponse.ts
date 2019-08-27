import {IncomingHttpHeaders} from 'http';

export interface HTTPResponse<T = any> {
  headers: IncomingHttpHeaders;
  statusCode: number;
  body: T;
}