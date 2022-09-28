import { addItem, moveItem, removeItem } from './value-utils';

describe('array value utils', function () {
  describe('move item', function () {
    it('should work with positive index', function () {
      expect(moveItem([3, 4, 5], 0, 1)).toEqual([4, 3, 5]);
      expect(moveItem([3, 4, 5], 0, 2)).toEqual([4, 5, 3]);
      expect(moveItem([3, 4, 5], 0, 3)).toEqual([4, 5, 3]);
      expect(moveItem([3, 4, 5], 0, 9)).toEqual([4, 5, 3]);
      expect(moveItem([3, 4, 5], 2, 0)).toEqual([5, 3, 4]);
      expect(moveItem([3, 4, 5], 2, 1)).toEqual([3, 5, 4]);
    });
    it('should work with negative index', function () {
      expect(moveItem([3, 4, 5], 0, -1)).toEqual([4, 5, 3]);
      expect(moveItem([3, 4, 5], 0, -2)).toEqual([4, 3, 5]);
      expect(moveItem([3, 4, 5], 1, -9)).toEqual([4, 3, 5]);
      expect(moveItem([3, 4, 5], -1, 0)).toEqual([5, 3, 4]);
      expect(moveItem([3, 4, 5], -1, 1)).toEqual([3, 5, 4]);
    });
  });
  describe('add item', function () {
    it('should work with positive index', function () {
      expect(addItem([3, 4, 5], 0, 6)).toEqual([6, 3, 4, 5]);
      expect(addItem([3, 4, 5], 1, 6)).toEqual([3, 6, 4, 5]);
      expect(addItem([3, 4, 5], 2, 6)).toEqual([3, 4, 6, 5]);
      expect(addItem([3, 4, 5], 3, 6)).toEqual([3, 4, 5, 6]);
      expect(addItem([3, 4, 5], 4, 6)).toEqual([3, 4, 5, undefined, 6]);
      expect(addItem([3, 4, 5], 5, 6)).toEqual([
        3,
        4,
        5,
        undefined,
        undefined,
        6,
      ]);
    });
    it('should work with negative index', function () {
      expect(addItem([3, 4, 5], -1, 6)).toEqual([3, 4, 5, 6]);
      expect(addItem([3, 4, 5], -2, 6)).toEqual([3, 4, 6, 5]);
      expect(addItem([3, 4, 5], -3, 6)).toEqual([3, 6, 4, 5]);
      expect(addItem([3, 4, 5], -4, 6)).toEqual([6, 3, 4, 5]);
      expect(addItem([3, 4, 5], -5, 6)).toEqual([6, 3, 4, 5]);
      expect(addItem([3, 4, 5], -10, 6)).toEqual([6, 3, 4, 5]);
    });
  });
  describe('remove item', function () {
    it('should work with positive values', function () {
      expect(removeItem([3, 4, 5], 0)).toEqual([4, 5]);
      expect(removeItem([3, 4, 5], 1)).toEqual([3, 5]);
      expect(removeItem([3, 4, 5], 2)).toEqual([3, 4]);
      expect(removeItem([3, 4, 5], 3)).toEqual([3, 4, 5]);
    });
    it('should work with negative values', function () {
      expect(removeItem([3, 4, 5], -1)).toEqual([3, 4]);
      expect(removeItem([3, 4, 5], -2)).toEqual([3, 5]);
      expect(removeItem([3, 4, 5], -3)).toEqual([4, 5]);
      expect(removeItem([3, 4, 5], -4)).toEqual([3, 4, 5]);
    });
  });
});
