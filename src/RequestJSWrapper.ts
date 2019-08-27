import request from 'request-promise-native';
import {HTTPRequest, HTTPRequestOptions} from './HTTPRequest';
import {HTTPRequestError} from './errors/HTTPRequestError';
import {HTTPRequestInvalidStatusCodeError} from './errors/HTTPRequestInvalidStatusCodeError';
import {HTTPResponse} from './HTTPResponse';

const baseRequest = request.defaults({
  gzip: true,
  pool: {
    maxSockets: 10240,
  },
});

export class RequestJSWrapper<T> implements HTTPRequest<T> {
  public readonly options: HTTPRequestOptions;

  public constructor(options: HTTPRequestOptions) {
    this.options = options;
  }

  /**
   * @throws {HTTPRequestError, HTTPRequestInvalidStatusCodeError}
   */
  public async execute(): Promise<HTTPResponse<T>> {
    const response = await baseRequest({
      proxy:                   false,
      ...this.options,
      resolveWithFullResponse: true,
      simple:                  false,
    }).promise()
      .catch((error) => {
        throw new HTTPRequestError(this.options, error);
      });

    if (response.statuscode >= 400) {
      throw new HTTPRequestInvalidStatusCodeError(this.options, response);
    }

    return {
      statusCode: response.statusCode,
      body:       response.body,
      headers:    response.headers,
    };
  }
}
