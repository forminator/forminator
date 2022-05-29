import { ReadonlyWire } from '@forminator/react-wire';
import { ForminatorFragment } from '../../fragment/forminator-fragment';
import { Option, throwNoneError } from '@forminator/option';
import { ValueComposer } from '../value-composer';

export function createAtomicValueComposer<Value>(): ValueComposer<
  Value,
  Value
> {
  return {
    compose(value: Value, { get }) {
      return value;
    },
    getFragments(value) {
      return [];
    },
  };
}
const atomicComposer = createAtomicValueComposer<any>();
export function getAtomicValueComposer<Value>(): ValueComposer<Value, Value> {
  return atomicComposer;
}

export type ArrayFragmentValue<Item> = Array<ForminatorFragment<any, Item>>;
function createArrayValueComposer<Item>(): ValueComposer<
  ArrayFragmentValue<Item>,
  Item[]
> {
  return {
    compose(value, { get }) {
      return value.map((item) => get(item));
    },
    getFragments(value) {
      return value;
    },
  };
}
const arrayComposer = createArrayValueComposer<any>();
export function getArrayValueComposer<Item>(): ValueComposer<
  ArrayFragmentValue<Item>,
  Item[]
> {
  return arrayComposer;
}

export type TaggedFragmentValue<Key extends string, Value> = Partial<
  Record<Key, ForminatorFragment<any, Value>>
>;
export function createTaggedValueComposer<Key extends string, Value>(
  fragment$: ReadonlyWire<Option<ForminatorFragment<Key, Key>>>,
): ValueComposer<TaggedFragmentValue<Key, Value>, Value> {
  return {
    compose(value, { get }) {
      const key = get(get(fragment$).ok());
      const fragment = value[key];
      if (!fragment) {
        throwNoneError();
      }
      return get(fragment);
    },
    getFragments(value, { get }) {
      const key = get(get(fragment$).ok());
      const fragment = value[key];
      if (!fragment) {
        throwNoneError();
      }
      return [fragment];
    },
  };
}
