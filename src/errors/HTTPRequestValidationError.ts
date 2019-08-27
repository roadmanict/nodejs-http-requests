import {HTTPRequestOptions} from '../HTTPRequest';
import {HTTPResponse} from '../HTTPResponse';
import {CustomError} from '@roadmanict/nodejs-common/dist/src/CustomError';

export class HTTPRequestValidationError extends CustomError {
  private readonly request: HTTPRequestOptions;
  private readonly response: HTTPResponse<any>;
  private readonly error: any;

  public constructor(request: HTTPRequestOptions, response: HTTPResponse<any>, error: any) {
    super('Error while making HTTP Request');

    this.request  = request;
    this.response = response;
    this.error    = error;
  }

  protected extendToJSON(): object {
    return {
      request:         this.request,
      response:        this.response,
      validationError: {
        name:    this.error.name,
        message: this.error.message,
        stack:   this.error.stack,
      },
    };
  }

}