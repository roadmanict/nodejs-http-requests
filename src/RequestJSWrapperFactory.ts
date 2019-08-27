import {HTTPRequest, HTTPRequestOptions} from './HTTPRequest';
import {RequestJSWrapper} from './RequestJSWrapper';
import {HTTPRequestFactory} from './HTTPRequestFactory';

export class RequestJSWrapperFactory implements HTTPRequestFactory {
  public create<T>(options: HTTPRequestOptions): HTTPRequest<T> {
    return new RequestJSWrapper(options);
  }
}