import { createAtomicValueComposer } from '../value-composer/__fixture__/composers';
import { createFragment } from './create-fragment';
import { setComposer } from './set-composer';

describe('setComposer', () => {
  describe('with different value', () => {
    it('should change composer', () => {
      const fragment = createFragment<number, number>(undefined, 0);
      const composer1 = createAtomicValueComposer<number>();
      const composer2 = createAtomicValueComposer<number>();
      setComposer(fragment, composer1);
      const maybeComposer1 = fragment.composer$.getValue();
      setComposer(fragment, composer2);
      const maybeComposer2 = fragment.composer$.getValue();
      expect(maybeComposer1).not.toBe(maybeComposer2);
    });
  });
  describe('with same value', () => {
    it('should not set value', () => {
      const fragment = createFragment<number, number>(undefined, 0);
      const composer = createAtomicValueComposer<number>();
      setComposer(fragment, composer);
      const maybeComposer1 = fragment.composer$.getValue();
      setComposer(fragment, composer);
      const maybeComposer2 = fragment.composer$.getValue();
      expect(maybeComposer1).toBe(maybeComposer2);
    });
  });
});
