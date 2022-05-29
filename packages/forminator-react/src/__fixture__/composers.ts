/* istanbul ignore file */

import { ValueComposer } from '@forminator/core';

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
