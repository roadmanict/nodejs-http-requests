import {HTTPRequestClient} from '../../src/HTTPRequestClient';
import {HTTPResponse} from '../../src/HTTPResponse';
import joi from '@hapi/joi';
import {createRequestMocks, createHTTPRequestValidationMocks} from '../mocks';

describe('A HTTPRequestClient', () => {
  const httpRequestMocks           = createRequestMocks();
  const httpRequestValidationMocks = createHTTPRequestValidationMocks();

  const httpRequestClient = new HTTPRequestClient({
    httpRequestFactory:           httpRequestMocks.factory,
    httpRequestValidationFactory: httpRequestValidationMocks.factory,
  });

  describe('Doing a request', () => {
    let response: HTTPResponse;

    beforeEach(async () => {
      response = await httpRequestClient.request({
        options: {
          url: '/url',
        },
      });
    });

    it('Returns a HTTPResponse', () => {
      expect(response).toBe(httpRequestMocks.response);
    });
  });

  describe('Doing a request with a validation schema', () => {
    let response: HTTPResponse;
    const joiMock = {} as joi.Schema;

    beforeEach(async () => {
      spyOn(httpRequestValidationMocks.factory, 'create').and.callThrough();

      response = await httpRequestClient.request({
        options:   {
          url: '/url',
        },
        joiSchema: joiMock,
      });
    });

    it('Returns a HTTPResponse', () => {
      expect(response).toBe(httpRequestValidationMocks.response);
    });

    it('Calls HTTPRequestValidationFactory create method', () => {
      expect(httpRequestValidationMocks.factory.create).toHaveBeenCalledWith(httpRequestMocks.request, joiMock);
    });
  });
});