import { configStorage } from './config-storage';

describe('configStorage', () => {
  it('should work', () => {
    expect(configStorage()).toEqual('config-storage');
  });
});
