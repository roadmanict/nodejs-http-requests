import joi from '@hapi/joi';
import {RequestJSWrapperFactory} from './RequestJSWrapperFactory';
import {HTTPRequestFactory} from './HTTPRequestFactory';
import {HTTPResponse} from './HTTPResponse';
import {HTTPRequest, HTTPRequestOptions} from './HTTPRequest';
import {HTTPRequestValidatorFactory} from './HTTPRequestValidatorFactory';

interface HTTPRequestClientParameters {
  httpRequestFactory?: HTTPRequestFactory;
  decorator?: <T>(request: HTTPRequest<T>) => HTTPRequest<T>;
}

interface RequestParameters {
  options: HTTPRequestOptions;
  joiSchema?: joi.Schema;
}

export class HTTPRequestClient {
  private readonly httpRequestFactory: HTTPRequestFactory;
  private readonly httpRequestValidationFactory: HTTPRequestValidatorFactory;
  private readonly decorator: <T>(request: HTTPRequest<T>) => HTTPRequest<T>;

  public constructor({
                       httpRequestFactory = new RequestJSWrapperFactory(),
                       decorator = (request) => request,
                     }: HTTPRequestClientParameters) {
    this.httpRequestFactory           = httpRequestFactory;
    this.httpRequestValidationFactory = new HTTPRequestValidatorFactory();
    this.decorator                    = decorator;
  }

  /**
   * @throws {HTTPRequestError}
   * @throws {HTTPRequestValidationError}
   */
  public request<T = any>({
                            options,
                            joiSchema,
                          }: RequestParameters): Promise<HTTPResponse<T>> {
    let request = this.httpRequestFactory.create<T>(options);
    if (joiSchema) {
      request = this.httpRequestValidationFactory.create(request, joiSchema);
    }
    request = this.decorator(request);

    return request.execute();
  }
}