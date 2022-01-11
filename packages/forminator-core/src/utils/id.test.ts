import { createId } from './id';

describe('id', function () {
  describe('createId', function () {
    it('should returns new id each times', function () {
      const id1 = createId();
      const id2 = createId();
      expect(id1).not.toBe(id2);
    });
    it('should starts with prefix', function () {
      const id = createId('prefix-');
      expect(id).toMatch(/^prefix-/);
    });
  });
});
