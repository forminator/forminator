import { useWire, Wire } from '@forminator/react-wire';
import { useComposer } from '../use-composer';
import { useFragment } from '../use-fragment';

import { fromOption, intoOption, ValueComposer } from '@forminator/core';
import { Defined } from '@forminator/core';

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
export function getInputValueComposer<Value extends Defined>(): ValueComposer<
  Value,
  Value
> {
  return inputComposer;
}

export function useInputValue$<Value extends Defined>(): Wire<
  Value | undefined
>;
export function useInputValue$<Value extends Defined>(
  defaultInitialValue: Value,
): Wire<Value>;
export function useInputValue$<Value extends Defined>(
  defaultInitialValue?: Value,
): Wire<Value | undefined> | Wire<Value> {
  const fragment = useFragment<Value, Value>();
  const initialValue = fragment.initialValue.or(
    intoOption(defaultInitialValue),
  );
  const value$ = useWire(fragment.value$, fromOption(initialValue));
  useComposer(getInputValueComposer<Value>());

  return value$;
}
