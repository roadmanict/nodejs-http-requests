import {HTTPRequestClient} from '../src/HTTPRequestClient';
import {HTTPResponse} from '../src/HTTPResponse';
import {HTTPRequest} from '../src/HTTPRequest';
import {HTTPRequestFactory} from '../src/HTTPRequestFactory';
import joi from '@hapi/joi';

const createHTTPMocks = <T = any>() => {
  const responseMock = {
    statusCode: 200,
    body:       {},
    headers:    {},
  } as HTTPResponse<T>;
  const httpRequest  = {
    execute: () => Promise.resolve(responseMock),
  } as HTTPRequest<T>;

  return {
    factory:  {
                create: () => httpRequest,
              } as HTTPRequestFactory,
    request:  httpRequest,
    response: responseMock,
  };
};

describe('A HTTPRequestClient', () => {
  const httpRequestMocks = createHTTPMocks();

  const httpRequestClient = new HTTPRequestClient({
    httpRequestFactory: httpRequestMocks.factory,
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
      expect(response).toEqual(httpRequestMocks.response);
    });
  });

  describe('Doing a request with a validation schema', () => {
    let response: HTTPResponse;

    beforeEach(async () => {
      response = await httpRequestClient.request({
        options: {
          url: '/url',
        },
        joiSchema: {} as joi.Schema,
      });
    });

    it('Returns a HTTPResponse', () => {
      expect(response).toEqual(httpRequestMocks.response);
    });
  });
});