import { none, some } from '@forminator/option';

describe('.toEqualSome', () => {
  it('should pass on some', function () {
    expect(some(5)).toEqualSome(5);
    const value = { foo: 5 };
    expect(some(value)).toEqualSome(value);
    expect(some({ foo: 5 })).toEqualSome({ foo: 5 });
  });
  it('should fail on none', () => {
    expect(() => expect(none()).toEqualSome(5)).toThrowErrorMatchingSnapshot();
    expect(() =>
      expect(none()).toEqualSome({ foo: 5 }),
    ).toThrowErrorMatchingSnapshot();
  });
  it('should fail on some with different value', () => {
    expect(() => expect(some(6)).toEqualSome(5)).toThrowErrorMatchingSnapshot();
    expect(() =>
      expect(some({ foo: 5 })).toEqualSome({ foo: 6 }),
    ).toThrowErrorMatchingSnapshot();
  });
  it('should fail on other value', function () {
    expect(() => expect(5).toEqualSome(5)).toThrowErrorMatchingSnapshot();
    const value = { foo: 5 };
    expect(() =>
      expect(value).toEqualSome(value),
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      expect({ foo: 5 }).toEqualSome({ foo: 5 }),
    ).toThrowErrorMatchingSnapshot();
  });
  it('should pass on some with matching pattern', function () {
    expect(some(5)).toEqualSome(expect.any(Number));
    expect(some({ foo: 5 })).toEqualSome({ foo: expect.any(Number) });
  });
  it('should fail on some with non-matching pattern', function () {
    expect(() =>
      expect(some('5')).toEqualSome(expect.any(Number)),
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      expect(some({ foo: '5' })).toEqualSome({ foo: expect.any(Number) }),
    ).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toEqualSome', () => {
  it('should fail on some', function () {
    expect(() =>
      expect(some(5)).not.toEqualSome(5),
    ).toThrowErrorMatchingSnapshot();
    const value = { foo: 5 };
    expect(() =>
      expect(some(value)).not.toEqualSome(value),
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      expect(some({ foo: 5 })).not.toEqualSome({ foo: 5 }),
    ).toThrowErrorMatchingSnapshot();
  });
  it('should pass on none', () => {
    expect(none()).not.toEqualSome(5);
    expect(none()).not.toEqualSome({ foo: 5 });
  });
  it('should pass on some with different value', () => {
    expect(some(6)).not.toEqualSome(5);
    expect(some({ foo: 5 })).not.toEqualSome({ foo: 6 });
  });
  it('should pass on other value', function () {
    expect(5).not.toEqualSome(5);
    const value = { foo: 5 };
    expect(value).not.toEqualSome(value);
    expect({ foo: 5 }).not.toEqualSome({ foo: 5 });
  });
  it('should fail on some with matching pattern', function () {
    expect(() =>
      expect(some(5)).not.toEqualSome(expect.any(Number)),
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      expect(some({ foo: 5 })).not.toEqualSome({ foo: expect.any(Number) }),
    ).toThrowErrorMatchingSnapshot();
  });
  it('should pass on some with non-matching pattern', function () {
    expect(some('5')).not.toEqualSome(expect.any(Number));
    expect(some({ foo: '5' })).not.toEqualSome({ foo: expect.any(Number) });
  });
});
