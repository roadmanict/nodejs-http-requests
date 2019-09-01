import joi from '@hapi/joi';
import {HTTPRequest} from './HTTPRequest';
import {HTTPResponse} from './HTTPResponse';
import {HTTPRequestValidationError} from './errors/HTTPRequestValidationError';
import {HTTPRequestDecorator} from './HTTPRequestDecorator';

interface HTTPRequestValidatorParameters<T> {
  request: HTTPRequest<T>;
  joiSchema: joi.Schema;
}

export class HTTPRequestValidator<T> extends HTTPRequestDecorator<T> {
  private readonly joiSchema: joi.Schema;

  public constructor({
                       request,
                       joiSchema,
                     }: HTTPRequestValidatorParameters<T>) {
    super(request);

    this.joiSchema = joiSchema;
  }

  /**
   * @throws {HTTPRequestError}
   * @throws {HTTPRequestValidationError}
   */
  public async execute(): Promise<HTTPResponse<T>> {
    const response = await this.request.execute();

    const {error, value} = this.joiSchema.validate(response.body);
    if (error) {
      throw new HTTPRequestValidationError(this.request.options, response, error);
    }

    return {
      ...response,
      body: value,
    };
  }
}