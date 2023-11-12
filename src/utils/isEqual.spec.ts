import { isEqual } from './isEqual';

describe('isEqual', () => {
  it('should produce correct result', () => {
    expect(isEqual('foo', 'foo')).toBeTruthy();
    expect(isEqual('foo', 'bar')).toBeFalsy();
    expect(isEqual('1', 1)).toBeFalsy();
    expect(isEqual({}, {})).toBeTruthy();
    expect(isEqual({ a: 1 }, { a: 1 })).toBeTruthy();
    expect(isEqual({ a: 1 }, { b: 2 })).toBeFalsy();
    expect(isEqual({ a: 1 }, { a: '1' })).toBeFalsy();
    expect(isEqual({ a: 1 }, { b: 1 })).toBeFalsy();
    expect(isEqual({ a: 1 }, {})).toBeFalsy();
    expect(isEqual([], [])).toBeTruthy();
    expect(isEqual([1], [1])).toBeTruthy();
    expect(isEqual([1], [2])).toBeFalsy();
    expect(isEqual([1], ['1'])).toBeFalsy();
    expect(isEqual([1], [])).toBeFalsy();
    expect(isEqual({}, [])).toBeFalsy();
    expect(isEqual(NaN, NaN)).toBeTruthy();
  });
});
