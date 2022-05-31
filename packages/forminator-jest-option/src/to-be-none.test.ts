import { none, some } from '@forminator/option';

describe('.toBeNone', () => {
  it('should pass on none', () => {
    expect(none()).toBeNone();
  });
  it('should fail on some', () => {
    expect(() => expect(some(5)).toBeNone()).toThrowErrorMatchingSnapshot();
  });
  it('should fail on other value', function () {
    expect(() => expect(5).toBeNone()).toThrowErrorMatchingSnapshot();
  });
  it('should fail on { some: false }', function () {
    expect(() =>
      expect({ some: false }).toBeNone(),
    ).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toBeNone', () => {
  it('should fail on none', () => {
    expect(() => expect(none()).not.toBeNone()).toThrowErrorMatchingSnapshot();
  });
  it('should pass on some', () => {
    expect(some(5)).not.toBeNone();
  });
  it('should pass on other value', function () {
    expect(5).not.toBeNone();
  });
  it('should pass on { some: false }', function () {
    expect({ some: false }).not.toBeNone();
  });
});
