import { mergeValues, selectField } from './value-utils';

describe('mergeValues', function () {
  it('should return empty object when values is empty', function () {
    expect(mergeValues({})).toEqual({});
  });
  it('should set simple field', function () {
    expect(mergeValues({ a: 1 })).toEqual({ a: 1 });
  });
  it('should set deep field', function () {
    expect(mergeValues({ 'a.b': 1 })).toEqual({ a: { b: 1 } });
  });
  it('should set nested field', function () {
    expect(mergeValues({ a: { b: 1 } })).toEqual({ a: { b: 1 } });
  });
  it('should set multiple deep field', function () {
    expect(mergeValues({ 'a.b': 1, 'a.c': 2 })).toEqual({ a: { b: 1, c: 2 } });
  });
  it('should merge shallow fields (starts with dot)', function () {
    expect(mergeValues({ 'a.b': 1, '.p1': { a: { c: 2 } } })).toEqual({
      a: { b: 1, c: 2 },
    });
  });
});

describe('selectField', function () {
  it('should returns undefined for not existing field', function () {
    expect(selectField({}, 'a.b')).toBeUndefined();
  });
  it('should returns value for existing field', function () {
    expect(selectField({ a: { b: 1 } }, 'a.b')).toBe(1);
  });
  it('should returns object for shallow field', function () {
    expect(selectField({ a: { b: 1 } }, '.part')).toEqual({ a: { b: 1 } });
  });
});
