import {RequestJSWrapperFactory} from '../../src/RequestJSWrapperFactory';
import {RequestJSWrapper} from '../../src/RequestJSWrapper';

describe('A RequestJSWrapperFactory', () => {
  it('Should be able to create a RequestJSWrapper', () => {
    const factory = new RequestJSWrapperFactory();

    const request = factory.create({url: 'url'});

    expect(request instanceof RequestJSWrapper).toEqual(true);
  });
});
