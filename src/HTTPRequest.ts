import * as request from 'request';
import {HTTPResponse} from './HTTPResponse';

export type HTTPRequestOptions = request.OptionsWithUrl & { url: string };

export interface HTTPRequest<T> {
  readonly options: HTTPRequestOptions;

  /**
   * @throws {HTTPRequestError}
   */
  execute(): Promise<HTTPResponse<T>>;
}