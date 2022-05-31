import { none, some } from '@forminator/option';

describe('.toBeSome', () => {
  it('should pass on some', () => {
    expect(some(5)).toBeSome();
  });
  it('should pass on some with expected value', function () {
    expect(some(5)).toBeSome(5);
    const value = { foo: 5 };
    expect(some(value)).toBeSome(value);
  });
  it('should fail on none', () => {
    expect(() => expect(none()).toBeSome()).toThrowErrorMatchingSnapshot();
  });
  it('should fail on none with expected value', () => {
    expect(() => expect(none()).toBeSome(5)).toThrowErrorMatchingSnapshot();
    expect(() =>
      expect(none()).toBeSome({ foo: 5 }),
    ).toThrowErrorMatchingSnapshot();
  });
  it('should fail on some with different value', () => {
    expect(() => expect(some(6)).toBeSome(5)).toThrowErrorMatchingSnapshot();
    expect(() =>
      expect(some({ foo: 5 })).toBeSome({ foo: 6 }),
    ).toThrowErrorMatchingSnapshot();
    expect(() =>
      expect(some({ foo: 5 })).toBeSome({ foo: 5 }),
    ).toThrowErrorMatchingSnapshot();
  });

  it('should fail on other value', function () {
    expect(() => expect(5).toBeSome()).toThrowErrorMatchingSnapshot();
  });
  it('should fail on other value with expected value', function () {
    expect(() => expect(5).toBeSome(5)).toThrowErrorMatchingSnapshot();
    const value = { foo: 5 };
    expect(() => expect(value).toBeSome(value)).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toBeSome', () => {
  it('should fail on some', () => {
    expect(() => expect(some(5)).not.toBeSome()).toThrowErrorMatchingSnapshot();
  });
  it('should fail on some with expected value', function () {
    expect(() =>
      expect(some(5)).not.toBeSome(5),
    ).toThrowErrorMatchingSnapshot();
    const value = { foo: 5 };
    expect(() =>
      expect(some(value)).not.toBeSome(value),
    ).toThrowErrorMatchingSnapshot();
  });
  it('should pass on none', () => {
    expect(none()).not.toBeSome();
  });
  it('should pass on none with expected value', () => {
    expect(none()).not.toBeSome(5);
    expect(none()).not.toBeSome({ foo: 5 });
  });
  it('should pass on some with different value', () => {
    expect(some(6)).not.toBeSome(5);
    expect(some({ foo: 5 })).not.toBeSome({ foo: 6 });
    expect(some({ foo: 5 })).not.toBeSome({ foo: 5 });
  });

  it('should pass on other value', function () {
    expect(5).not.toBeSome();
  });
  it('should pass on other value with expected value', function () {
    expect(5).not.toBeSome(5);
    const value = { foo: 5 };
    expect(value).not.toBeSome(value);
  });
});
