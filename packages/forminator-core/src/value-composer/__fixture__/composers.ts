import { ForminatorFragment } from '../../fragment/forminator-fragment';
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
