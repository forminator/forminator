import { useWire, Wire } from '@forminator/react-wire';
import { useComposer } from '../use-composer';
import { useExternalValue } from '../use-external-value';
import { useFragment } from '../use-fragment';

import { fromOption, ValueComposer } from '@forminator/core';

export function createInputValueComposer<Value>(): ValueComposer<Value, Value> {
  return {
    compose(value: Value, { get }) {
      return value;
    },
    /* istanbul ignore next */
    getFragments(value) {
      return [];
    },
  };
}
const inputComposer = createInputValueComposer<any>();
export function getInputValueComposer<Value>(): ValueComposer<Value, Value> {
  return inputComposer;
}

export function useInputValue$<Value>(): Wire<Value | undefined>;
export function useInputValue$<Value>(defaultInitialValue: Value): Wire<Value>;
export function useInputValue$<Value>(
  defaultInitialValue?: Value,
): Wire<Value | undefined> | Wire<Value> {
  const fragment = useFragment<Value, Value>();
  const externalValue = fromOption(useExternalValue<Value>());
  const value$ = useWire(
    fragment.value$,
    externalValue === undefined ? defaultInitialValue : externalValue,
  );
  useComposer(getInputValueComposer<Value>());

  return value$;
}
