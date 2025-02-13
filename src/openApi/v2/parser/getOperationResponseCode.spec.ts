import { getOperationResponseCode } from './getOperationResponseCode';

describe('getOperationResponseCode', () => {
  it('should produce correct result', () => {
    expect(getOperationResponseCode('')).toEqual(null);
    expect(getOperationResponseCode('default')).toEqual(0);
    expect(getOperationResponseCode('200')).toEqual(200);
    expect(getOperationResponseCode('300')).toEqual(300);
    expect(getOperationResponseCode('400')).toEqual(400);
    expect(getOperationResponseCode('abc')).toEqual(null);
    expect(getOperationResponseCode('-100')).toEqual(100);
  });
});
