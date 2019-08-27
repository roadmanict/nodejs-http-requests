import joi from '@hapi/joi';
import {HTTPRequest} from './HTTPRequest';
import {HTTPRequestValidator} from './HTTPRequestValidator';

export class HTTPRequestValidatorFactory {
  public create<T>(request: HTTPRequest<T>, joiSchema: joi.Schema): HTTPRequest<T> {
    return new HTTPRequestValidator<T>({
      request:   request,
      joiSchema: joiSchema,
    });
  }
}