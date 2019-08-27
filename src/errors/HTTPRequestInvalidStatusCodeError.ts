import {HTTPRequestOptions} from '../HTTPRequest';
import {CustomError} from '@roadmanict/nodejs-common/dist/src/CustomError';
import {HTTPResponse} from '../HTTPResponse';

export class HTTPRequestInvalidStatusCodeError extends CustomError {
  private readonly request: HTTPRequestOptions;
  private readonly response: HTTPResponse<any>;

  public constructor(request: HTTPRequestOptions, response: HTTPResponse<any>) {
    super('Error while making HTTP Request');

    this.request  = request;
    this.response = response;
  }

  protected extendToJSON(): object {
    return {
      request:  this.request,
      response: this.response,
    };
  }
}