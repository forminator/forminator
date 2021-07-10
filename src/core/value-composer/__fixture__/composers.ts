import { ForminatorFragment } from '../../fragment/forminator-fragment';
import { ValueComposer } from '../value-composer';

function _getAtomicValueComposer<Value>(): ValueComposer<Value, Value> {
  return {
    compose(value: Value, { get }) {
      return value;
    },
    getFragments(value) {
      return [];
    },
  };
}
const atomicComposer = _getAtomicValueComposer<any>();
export function getAtomicValueComposer<Value>(): ValueComposer<Value, Value> {
  return atomicComposer;
}

export type ArrayFragmentValue<Item> = Array<ForminatorFragment<any, Item>>;
function _getArrayValueComposer<Item>(): ValueComposer<
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
const arrayComposer = _getArrayValueComposer<any>();
export function getArrayValueComposer<Item>(): ValueComposer<
  ArrayFragmentValue<Item>,
  Item[]
> {
  return arrayComposer;
}
