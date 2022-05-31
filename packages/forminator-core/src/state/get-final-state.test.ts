import { createWire } from '@forminator/react-wire';
import { createFragment } from '../fragment/create-fragment';
import { ForminatorFragment } from '../fragment/forminator-fragment';
import { setComposer } from '../fragment/set-composer';
import { loadingStateComposer } from '../state-composer/__fixture__/composers';
import { none, Option, some } from '@forminator/option';
import {
  ArrayFragmentValue,
  createTaggedValueComposer,
  getArrayValueComposer,
  getAtomicValueComposer,
  TaggedFragmentValue,
} from '../value-composer/__fixture__/composers';
import {
  getFinalState,
  getFinalState$,
  waitForFinalState,
} from './get-final-state';
import { getState$ } from './get-state-wire';

describe('getFinalState', () => {
  describe('with atomic fragment', () => {
    it('should return none without value composer', () => {
      const fragment = createFragment<number, number>(0);
      const loading = getFinalState(fragment, loadingStateComposer);
      expect(loading).toBeNone();
    });
    it('should return state without state wire', () => {
      const fragment = createFragment<number, number>(0);
      setComposer(fragment, getAtomicValueComposer());
      const loading = getFinalState(fragment, loadingStateComposer);
      expect(loading).toBeSome(false);
    });
    it('should return state with state wire', () => {
      const fragment = createFragment<number, number>(0);
      setComposer(fragment, getAtomicValueComposer());
      getState$(fragment, loadingStateComposer, false);
      const loading = getFinalState(fragment, loadingStateComposer);
      expect(loading).toBeSome(false);
    });
    it('should update when state changed', () => {
      const fragment = createFragment<number, number>(0);
      setComposer(fragment, getAtomicValueComposer());
      const state$ = getState$(fragment, loadingStateComposer, false);
      state$.fns.loading();
      const loading = getFinalState(fragment, loadingStateComposer);
      expect(loading).toBeSome(true);
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
      expect(loading).toBeNone();
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
      expect(loading).toBeSome(false);
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

      expect(getFinalState(fragment, loadingStateComposer)).toBeSome(true);
      state$.fns.ready();

      expect(getFinalState(fragment, loadingStateComposer)).toEqual(
        some(false),
      );
    });

    it('should update state only based on active fragments', () => {
      type Key = 'A' | 'B';
      const keyFragment$ = createWire(some(createFragment<Key, Key>('A')));
      const item1 = createFragment<number, number>(1);
      const item2 = createFragment<number, number>(2);
      const fragment = createFragment<TaggedFragmentValue<Key, number>, number>(
        {
          A: item1,
          B: item2,
        },
      );
      setComposer(keyFragment$.getValue().ok(), getAtomicValueComposer());
      setComposer(item1, getAtomicValueComposer());
      setComposer(item2, getAtomicValueComposer());
      setComposer(fragment, createTaggedValueComposer(keyFragment$));

      const state$ = getState$(item1, loadingStateComposer);
      expect(getFinalState(fragment, loadingStateComposer)).toEqual(
        some(false),
      );

      state$.fns.loading();

      expect(getFinalState(fragment, loadingStateComposer)).toBeSome(true);
      keyFragment$.getValue().ok().value$.setValue('B');

      expect(getFinalState(fragment, loadingStateComposer)).toEqual(
        some(false),
      );
    });
    it('should update state only based on active fragments when key is none', () => {
      type Key = 'A' | 'B';
      const keyFragment$ = createWire(
        none() as Option<ForminatorFragment<Key, Key>>,
      );
      const item1 = createFragment<number, number>(1);
      const item2 = createFragment<number, number>(2);
      const fragment = createFragment<TaggedFragmentValue<Key, number>, number>(
        {
          A: item1,
          B: item2,
        },
      );
      setComposer(item1, getAtomicValueComposer());
      setComposer(item2, getAtomicValueComposer());
      setComposer(fragment, createTaggedValueComposer(keyFragment$));

      expect(getFinalState(fragment, loadingStateComposer)).toBeNone();
    });
    it('should update state only based on active fragments when fragment is missing', () => {
      type Key = 'A' | 'B';
      const keyFragment$ = createWire(some(createFragment<Key, Key>('A')));
      const item1 = createFragment<number, number>(1);
      const fragment = createFragment<TaggedFragmentValue<Key, number>, number>(
        {
          A: item1,
        },
      );
      setComposer(keyFragment$.getValue().ok(), getAtomicValueComposer());
      setComposer(item1, getAtomicValueComposer());
      setComposer(fragment, createTaggedValueComposer(keyFragment$));

      const state$ = getState$(item1, loadingStateComposer);
      expect(getFinalState(fragment, loadingStateComposer)).toEqual(
        some(false),
      );

      state$.fns.loading();

      expect(getFinalState(fragment, loadingStateComposer)).toBeSome(true);
      keyFragment$.getValue().ok().value$.setValue('B');

      expect(getFinalState(fragment, loadingStateComposer)).toBeNone();
    });
  });
});

describe('getFinalState$', () => {
  describe('with atomic fragment', () => {
    it('should have none value without value composer', () => {
      const fragment = createFragment<number, number>(0);
      const loading$ = getFinalState$(fragment, loadingStateComposer);
      expect(loading$.getValue()).toBeNone();
    });
    it('should have state without state wire', () => {
      const fragment = createFragment<number, number>(0);
      const loading$ = getFinalState$(fragment, loadingStateComposer);
      setComposer(fragment, getAtomicValueComposer());
      expect(loading$.getValue()).toBeSome(false);
    });
    it('should have state with state wire', () => {
      const fragment = createFragment<number, number>(0);
      const loading$ = getFinalState$(fragment, loadingStateComposer);
      setComposer(fragment, getAtomicValueComposer());
      getState$(fragment, loadingStateComposer, false);
      expect(loading$.getValue()).toBeSome(false);
    });
    it('should update when state changed', () => {
      const fragment = createFragment<number, number>(0);
      const loading$ = getFinalState$(fragment, loadingStateComposer);
      setComposer(fragment, getAtomicValueComposer());
      const state$ = getState$(fragment, loadingStateComposer, false);
      state$.fns.loading();
      expect(loading$.getValue()).toBeSome(true);
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

      expect(loading$.getValue()).toBeNone();
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

      expect(loading$.getValue()).toBeSome(false);
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
      expect(finalState$.getValue()).toBeSome(false);

      state$.fns.loading();

      expect(finalState$.getValue()).toBeSome(true);
      state$.fns.ready();

      expect(finalState$.getValue()).toBeSome(false);
    });
    it('should update state only based on active fragments', () => {
      type Key = 'A' | 'B';
      const keyFragment$ = createWire(some(createFragment<Key, Key>('A')));
      const item1 = createFragment<number, number>(1);
      const item2 = createFragment<number, number>(2);
      const fragment = createFragment<TaggedFragmentValue<Key, number>, number>(
        {
          A: item1,
          B: item2,
        },
      );
      setComposer(keyFragment$.getValue().ok(), getAtomicValueComposer());
      setComposer(item1, getAtomicValueComposer());
      setComposer(item2, getAtomicValueComposer());
      setComposer(fragment, createTaggedValueComposer(keyFragment$));

      const state$ = getState$(item1, loadingStateComposer);
      expect(getFinalState$(fragment, loadingStateComposer).getValue()).toEqual(
        some(false),
      );

      state$.fns.loading();

      expect(getFinalState$(fragment, loadingStateComposer).getValue()).toEqual(
        some(true),
      );
      keyFragment$.getValue().ok().value$.setValue('B');

      expect(getFinalState$(fragment, loadingStateComposer).getValue()).toEqual(
        some(false),
      );
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

describe('waitForFinalState', () => {
  it('should resolves to final state', async () => {
    const fragment = createFragment<number, number>(0);
    setComposer(fragment, getAtomicValueComposer());
    await expect(
      waitForFinalState(fragment, loadingStateComposer),
    ).resolves.toEqual(false);
  });
});
