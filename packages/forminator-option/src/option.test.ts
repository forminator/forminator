import {
  catchNoneError,
  fromOption,
  intoOption,
  isOption,
  none,
  NoneError,
  Option,
  some,
} from './option';

describe('option', () => {
  describe('some', () => {
    it('should be some', () => {
      expect(some(5).isSome()).toBe(true);
      expect(some(5).isNone()).toBe(false);
    });
  });
  describe('none', () => {
    it('should be none', () => {
      expect(none().isSome()).toBe(false);
      expect(none().isNone()).toBe(true);
    });
  });
  describe('ok', () => {
    it('should return value of some', () => {
      expect(some(5).ok()).toBe(5);
    });
    it('should throw when get none', () => {
      expect(() => none().ok()).toThrow(NoneError);
    });
  });
  describe('catchNoneError', () => {
    const doubleX = (o: Option<{ x: number }>) =>
      catchNoneError(() => o.ok().x * 2);
    it('should return the returned value', () => {
      expect(doubleX(some({ x: 5 }))).toEqual(some(10));
    });
    it('should return none when NoneError throw', () => {
      expect(doubleX(none())).toEqual(none());
    });
    it('should re-throw other errors', () => {
      // @ts-expect-error
      expect(() => doubleX(some(null))).toThrow();
    });
  });
  describe('map', () => {
    const double = (o: Option<number>) => o.map((v) => v * 2);
    it('should map some', () => {
      expect(double(some(5))).toEqual(some(10));
    });
    it('should map none', () => {
      expect(double(none())).toEqual(none());
    });
  });
  describe('or', function () {
    it('should returns some value', function () {
      expect(some(5).or(10)).toEqual(5);
    });
    it('should returns default value for none', function () {
      expect(none().or(10)).toEqual(10);
    });
  });
});

describe('isOption', function () {
  it('should return true for any option', function () {
    expect(isOption(some(5))).toBe(true);
    expect(isOption(none())).toBe(true);
  });
  it('should return false for other objects', function () {
    expect(isOption(5)).toBe(false);
    expect(isOption(null)).toBe(false);
    expect(isOption(undefined)).toBe(false);
    expect(isOption({})).toBe(false);

    expect(isOption({ some: false })).toBe(false);
    expect(isOption({ some: true })).toBe(false);
  });
  it('should narrow types correctly', function () {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    function fn1(o: number | Option<number>) {
      if (isOption(o)) {
        const v: Option<number> = o;
      }
      if (isOption(o)) {
        // @ts-expect-error
        const s: Option<string> = o;
      }
    }

    function fn2(o: any) {
      if (isOption(o)) {
        const s: Option<unknown> = o;
      }
      if (isOption(o)) {
        // @ts-expect-error
        const v: Option<number> = o;
      }
    }
    /* eslint-enable */
  });
});

describe('intoOption', function () {
  it('should return some when value is defined', function () {
    expect(intoOption(5)).toEqual(some(5));
  });
  it('should return some when value is null', function () {
    expect(intoOption(null)).toEqual(some(null));
  });
  it('should return none when value is undefined', function () {
    expect(intoOption(undefined)).toEqual(none());
  });
});

describe('fromOption', function () {
  it('should returns value for some', function () {
    expect(fromOption(some(5))).toEqual(5);
  });
  it('should returns value for some null', function () {
    expect(fromOption(some(null))).toEqual(null);
  });
  it('should returns undefined for none', function () {
    expect(fromOption(none())).toEqual(undefined);
  });
});
