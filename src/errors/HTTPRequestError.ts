import {HTTPRequestOptions} from '../HTTPRequest';
import {CustomError} from '@roadmanict/nodejs-common/dist/CustomError';

export class HTTPRequestError extends CustomError {
  private readonly request: HTTPRequestOptions;
  private readonly error: any;

  public constructor(request: HTTPRequestOptions, error: any) {
    super('Error while making HTTP Request');

    this.request = request;
    this.error   = error;
  }

  protected extendToJSON(): object {
    return {
      request:       this.request,
      originalError: {
        name:    this.error.name,
        message: this.error.message,
        stack:   this.error.stack,
      },
    };
  }
}