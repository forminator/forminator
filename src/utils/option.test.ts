import { catchNoneError, none, NoneError, Option, some } from './option';

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
    it('should throw when get some', () => {
      expect(() => none().ok()).toThrow(NoneError);
    });
  });
  describe('catchNoneError', () => {
    const doubleX = (o: Option<{ x: number }>) =>
      catchNoneError(() => o.ok().x * 2);
    it('should return the returned value', () => {
      expect(doubleX(some({ x: 5 }))).toEqual(some(10));
    });
    it('should return the returned value', () => {
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
});
