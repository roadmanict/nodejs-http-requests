import {HTTPRequestOptions} from '../HTTPRequest';
import {CustomError} from '@roadmanict/nodejs-common/dist/src/CustomError';

export class HTTPRequestError extends CustomError {
  public static MESSAGE: string = 'HTTP request failed';

  private readonly request: HTTPRequestOptions;
  private readonly error: any;

  public constructor(request: HTTPRequestOptions, error: any) {
    super(HTTPRequestError.MESSAGE);

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