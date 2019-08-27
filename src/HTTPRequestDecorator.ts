import {HTTPRequest, HTTPRequestOptions} from './HTTPRequest';
import {HTTPResponse} from './HTTPResponse';

export abstract class HTTPRequestDecorator<T> implements HTTPRequest<T> {
  public request: HTTPRequest<T>;

  protected constructor(request: HTTPRequest<T>) {
    this.request = request;
  }

  public execute(): Promise<HTTPResponse<T>> {
    return this.request.execute();
  }

  public get options(): HTTPRequestOptions {
    return this.request.options;
  }
}