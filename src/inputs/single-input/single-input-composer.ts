import { ValueComposer } from '../../core/value-composer/value-composer';

export function createSingleInputComposer<Value>(): ValueComposer<
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
const atomicComposer = createSingleInputComposer<any>();
export function getSingleInputComposer<Value>(): ValueComposer<Value, Value> {
  return atomicComposer;
}
