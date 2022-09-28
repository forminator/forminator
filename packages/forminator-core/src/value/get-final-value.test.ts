import { createWire } from '@forminator/react-wire';
import { createFragment } from '../fragment/create-fragment';
import { setComposer } from '../fragment/set-composer';
import { none, some } from '@forminator/option';
import {
  ArrayFragmentValue,
  createTaggedValueComposer,
  getArrayValueComposer,
  getAtomicValueComposer,
  TaggedFragmentValue,
} from '../value-composer/__fixture__/composers';
import {
  getFinalValue,
  getFinalValue$,
  waitForFinalValue,
} from './get-final-value';

describe('getFinalValue', () => {
  it('should return none if composer not defined', () => {
    const fragment = createFragment(0);
    const finalValue = getFinalValue(fragment);
    expect(finalValue).toBeNone();
  });
  it('should return value if composer defined', () => {
    const fragment = createFragment<number, number>(0);
    setComposer<number, number>(fragment, getAtomicValueComposer());

    const finalValue = getFinalValue(fragment);
    expect(finalValue).toBeSome(0);
  });
  it('should return none if sub fragment is not ready', () => {
    const fragment = createFragment<ArrayFragmentValue<number>, number[]>([]);
    const item1 = createFragment<number, number>(1);
    const item2 = createFragment<number, number>(2);
    setComposer(fragment, getArrayValueComposer());
    setComposer(item1, getAtomicValueComposer());
    // item2 has no composer

    fragment.value$.setValue([item1, item2]);
    const finalValue = getFinalValue(fragment);
    expect(finalValue).toBeNone();
  });
  it('should return value if all fragment is ready', () => {
    const fragment = createFragment<ArrayFragmentValue<number>, number[]>([]);
    const item1 = createFragment<number, number>(1);
    const item2 = createFragment<number, number>(2);
    setComposer(fragment, getArrayValueComposer());
    setComposer(item1, getAtomicValueComposer());
    setComposer(item2, getAtomicValueComposer());

    fragment.value$.setValue([item1, item2]);
    const finalValue = getFinalValue(fragment);
    expect(finalValue).toEqualSome([1, 2]);
  });
});

describe('getFinalValue$', () => {
  it('should have none value if composer not defined', () => {
    const fragment = createFragment(0);
    const finalValue$ = getFinalValue$(fragment);
    expect(finalValue$.getValue()).toBeNone();
  });
  it('should have value if composer defined', () => {
    const fragment = createFragment<number, number>(0);
    const finalValue$ = getFinalValue$(fragment);

    setComposer<number, number>(fragment, getAtomicValueComposer());
    expect(finalValue$.getValue()).toBeSome(0);
  });

  it('should update when composer defined', () => {
    const fragment = createFragment<number, number>(0);
    const finalValue$ = getFinalValue$(fragment);

    const fn = jest.fn();
    finalValue$.subscribe(fn);
    setComposer<number, number>(fragment, getAtomicValueComposer());
    expect(fn).toBeCalledWith(some(0));
  });
  it('should have none value if sub fragment is not ready', () => {
    const fragment = createFragment<ArrayFragmentValue<number>, number[]>([]);
    const item1 = createFragment<number, number>(1);
    const item2 = createFragment<number, number>(2);
    setComposer(fragment, getArrayValueComposer());

    const finalValue$ = getFinalValue$(fragment);
    expect(finalValue$.getValue()).toEqualSome([]);

    setComposer(item1, getAtomicValueComposer());
    // item2 has no composer

    fragment.value$.setValue([item1, item2]);
    expect(finalValue$.getValue()).toBeNone();
  });
  it('should have value if all fragment is ready', () => {
    const fragment = createFragment<ArrayFragmentValue<number>, number[]>([]);
    const item1 = createFragment<number, number>(1);
    const item2 = createFragment<number, number>(2);
    const finalValue$ = getFinalValue$(fragment);

    setComposer(fragment, getArrayValueComposer());
    setComposer(item1, getAtomicValueComposer());
    setComposer(item2, getAtomicValueComposer());

    fragment.value$.setValue([item1, item2]);

    expect(finalValue$.getValue()).toEqualSome([1, 2]);
  });
  it('should update value if all fragment is ready', () => {
    const fragment = createFragment<ArrayFragmentValue<number>, number[]>([]);
    const item1 = createFragment<number, number>(1);
    const item2 = createFragment<number, number>(2);
    const finalValue$ = getFinalValue$(fragment);

    const fn = jest.fn();
    finalValue$.subscribe(fn);

    setComposer(fragment, getArrayValueComposer());
    setComposer(item1, getAtomicValueComposer());
    setComposer(item2, getAtomicValueComposer());

    fragment.value$.setValue([item1, item2]);
    expect(fn).toBeCalledWith(some([1, 2]));
  });
  it('should update value only based on active fragments', () => {
    type Key = 'A' | 'B';
    const keyFragment$ = createWire(some(createFragment<Key, Key>('A')));
    const item1 = createFragment<number, number>(1);
    const item2 = createFragment<number, number>(2);
    const fragment = createFragment<TaggedFragmentValue<Key, number>, number>({
      A: item1,
      B: item2,
    });
    const finalValue$ = getFinalValue$(fragment);

    setComposer(keyFragment$.getValue().unwrap(), getAtomicValueComposer());
    setComposer(item1, getAtomicValueComposer());
    setComposer(item2, getAtomicValueComposer());
    setComposer(fragment, createTaggedValueComposer(keyFragment$));

    expect(finalValue$.getValue()).toBeSome(1);

    const fn = jest.fn();
    finalValue$.subscribe(fn);

    keyFragment$.getValue().unwrap().value$.setValue('B');
    expect(finalValue$.getValue()).toBeSome(2);
    expect(fn).toBeCalledWith(some(2));
  });
  it('should update value to none when active fragment is missing', () => {
    type Key = 'A' | 'B';
    const keyFragment$ = createWire(some(createFragment<Key, Key>('A')));
    const item1 = createFragment<number, number>(1);
    const fragment = createFragment<TaggedFragmentValue<Key, number>, number>({
      A: item1,
    });
    const finalValue$ = getFinalValue$(fragment);

    setComposer(keyFragment$.getValue().unwrap(), getAtomicValueComposer());
    setComposer(item1, getAtomicValueComposer());
    setComposer(fragment, createTaggedValueComposer(keyFragment$));

    expect(finalValue$.getValue()).toBeSome(1);

    const fn = jest.fn();
    finalValue$.subscribe(fn);

    keyFragment$.getValue().unwrap().value$.setValue('B');
    expect(finalValue$.getValue()).toBeNone();
    expect(fn).toBeCalledWith(none());
  });
  it('should cache final value wire', () => {
    const fragment = createFragment(0);
    const finalValue$1 = getFinalValue$(fragment);
    const finalValue$2 = getFinalValue$(fragment);
    expect(finalValue$1).toEqual(finalValue$2);
  });
});

describe('waitForFinalValue', () => {
  it('should resolves to final value', async () => {
    const fragment = createFragment<number, number>(0);
    setComposer<number, number>(fragment, getAtomicValueComposer());

    await expect(waitForFinalValue(fragment)).resolves.toEqual(0);
  });
});
