import { createFragment } from '../fragment/create-fragment';
import { setComposer } from '../fragment/set-composer';
import { loadingStateComposer } from '../state-composer/__fixture__/composers';
import { none, some } from '../utils/option';
import {
  ArrayFragmentValue,
  getArrayValueComposer,
  getAtomicValueComposer,
} from '../value-composer/__fixture__/composers';
import { getFinalState, getFinalState$ } from './get-final-state';
import { getState$ } from './get-state-wire';

describe('getFinalState', () => {
  describe('with atomic fragment', () => {
    it('should return none without value composer', () => {
      const fragment = createFragment<number, number>(0);
      const loading = getFinalState(fragment, loadingStateComposer);
      expect(loading).toEqual(none());
    });
    it('should return state without state wire', () => {
      const fragment = createFragment<number, number>(0);
      setComposer(fragment, getAtomicValueComposer());
      const loading = getFinalState(fragment, loadingStateComposer);
      expect(loading).toEqual(some(false));
    });
    it('should return state with state wire', () => {
      const fragment = createFragment<number, number>(0);
      setComposer(fragment, getAtomicValueComposer());
      getState$(fragment, loadingStateComposer, false);
      const loading = getFinalState(fragment, loadingStateComposer);
      expect(loading).toEqual(some(false));
    });
    it('should update when state changed', () => {
      const fragment = createFragment<number, number>(0);
      setComposer(fragment, getAtomicValueComposer());
      const state$ = getState$(fragment, loadingStateComposer, false);
      state$.fns.loading();
      const loading = getFinalState(fragment, loadingStateComposer);
      expect(loading).toEqual(some(true));
    });
  });
  describe('with composite fragments', () => {
    it('should return none when some composer is not defined', () => {
      const item1 = createFragment<number, number>(1);
      const item2 = createFragment<number, number>(2);
      const fragment = createFragment<ArrayFragmentValue<number>, number[]>([
        item1,
        item2,
      ]);
      setComposer(item1, getAtomicValueComposer());
      // item2 has no composer
      setComposer(fragment, getArrayValueComposer());

      const loading = getFinalState(fragment, loadingStateComposer);
      expect(loading).toEqual(none());
    });
    it('should return state when all composer defined', () => {
      const item1 = createFragment<number, number>(1);
      const item2 = createFragment<number, number>(2);
      const fragment = createFragment<ArrayFragmentValue<number>, number[]>([
        item1,
        item2,
      ]);
      setComposer(item1, getAtomicValueComposer());
      setComposer(item2, getAtomicValueComposer());
      setComposer(fragment, getArrayValueComposer());

      const loading = getFinalState(fragment, loadingStateComposer);
      expect(loading).toEqual(some(false));
    });

    it('should return update state when some state changed', () => {
      const item1 = createFragment<number, number>(1);
      const item2 = createFragment<number, number>(2);
      const fragment = createFragment<ArrayFragmentValue<number>, number[]>([
        item1,
        item2,
      ]);
      setComposer(item1, getAtomicValueComposer());
      setComposer(item2, getAtomicValueComposer());
      setComposer(fragment, getArrayValueComposer());

      const state$ = getState$(fragment, loadingStateComposer);
      expect(getFinalState(fragment, loadingStateComposer)).toEqual(
        some(false),
      );

      state$.fns.loading();

      expect(getFinalState(fragment, loadingStateComposer)).toEqual(some(true));
      state$.fns.ready();

      expect(getFinalState(fragment, loadingStateComposer)).toEqual(
        some(false),
      );
    });
  });
});

describe('getFinalState$', () => {
  describe('with atomic fragment', () => {
    it('should have none value without value composer', () => {
      const fragment = createFragment<number, number>(0);
      const loading$ = getFinalState$(fragment, loadingStateComposer);
      expect(loading$.getValue()).toEqual(none());
    });
    it('should have state without state wire', () => {
      const fragment = createFragment<number, number>(0);
      const loading$ = getFinalState$(fragment, loadingStateComposer);
      setComposer(fragment, getAtomicValueComposer());
      expect(loading$.getValue()).toEqual(some(false));
    });
    it('should have state with state wire', () => {
      const fragment = createFragment<number, number>(0);
      const loading$ = getFinalState$(fragment, loadingStateComposer);
      setComposer(fragment, getAtomicValueComposer());
      getState$(fragment, loadingStateComposer, false);
      expect(loading$.getValue()).toEqual(some(false));
    });
    it('should update when state changed', () => {
      const fragment = createFragment<number, number>(0);
      const loading$ = getFinalState$(fragment, loadingStateComposer);
      setComposer(fragment, getAtomicValueComposer());
      const state$ = getState$(fragment, loadingStateComposer, false);
      state$.fns.loading();
      expect(loading$.getValue()).toEqual(some(true));
    });
  });
  describe('with composite fragments', () => {
    it('should have none value when some composer is not defined', () => {
      const item1 = createFragment<number, number>(1);
      const item2 = createFragment<number, number>(2);
      const fragment = createFragment<ArrayFragmentValue<number>, number[]>([
        item1,
        item2,
      ]);
      const loading$ = getFinalState$(fragment, loadingStateComposer);
      setComposer(item1, getAtomicValueComposer());
      // item2 has no composer
      setComposer(fragment, getArrayValueComposer());

      expect(loading$.getValue()).toEqual(none());
    });

    it('should have state when all composer defined', () => {
      const item1 = createFragment<number, number>(1);
      const item2 = createFragment<number, number>(2);
      const fragment = createFragment<ArrayFragmentValue<number>, number[]>([
        item1,
        item2,
      ]);
      const loading$ = getFinalState$(fragment, loadingStateComposer);
      setComposer(item1, getAtomicValueComposer());
      setComposer(item2, getAtomicValueComposer());
      setComposer(fragment, getArrayValueComposer());

      expect(loading$.getValue()).toEqual(some(false));
    });

    it('should have updated state when some state changed', () => {
      const item1 = createFragment<number, number>(1);
      const item2 = createFragment<number, number>(2);
      const fragment = createFragment<ArrayFragmentValue<number>, number[]>([
        item1,
        item2,
      ]);
      const finalState$ = getFinalState$(fragment, loadingStateComposer);
      setComposer(item1, getAtomicValueComposer());
      setComposer(item2, getAtomicValueComposer());
      setComposer(fragment, getArrayValueComposer());

      const state$ = getState$(fragment, loadingStateComposer);
      expect(finalState$.getValue()).toEqual(some(false));

      state$.fns.loading();

      expect(finalState$.getValue()).toEqual(some(true));
      state$.fns.ready();

      expect(finalState$.getValue()).toEqual(some(false));
    });
  });
  it('should cache final value wire', () => {
    const fragment = createFragment(0);
    const finalState$1 = getFinalState$(fragment, loadingStateComposer);
    const finalState$2 = getFinalState$(fragment, loadingStateComposer);
    expect(finalState$1).toEqual(finalState$2);
  });
});
describe('getState$', () => {
  it('should cache final value wire', () => {
    const fragment = createFragment(0);
    const finalState$1 = getState$(fragment, loadingStateComposer);
    const finalState$2 = getState$(fragment, loadingStateComposer);
    expect(finalState$1).toEqual(finalState$2);
  });
});
