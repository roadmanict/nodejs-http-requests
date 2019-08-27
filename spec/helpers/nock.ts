import nock from 'nock';

beforeAll(() => {
  nock.disableNetConnect();
});