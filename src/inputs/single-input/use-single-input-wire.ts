import { useWire, Wire } from '@forminator/react-wire';
import { useComposer } from '../../react/use-composer';
import { useExternalValue } from '../../react/use-external-value';
import { useFragment } from '../../react/use-fragment';
import { getSingleInputComposer } from './single-input-composer';

export function useSingleInputWire<Value>(
  defaultInitialValue: Value,
): Wire<Value> {
  useComposer(getSingleInputComposer<Value>());
  const externalValue = useExternalValue<Value>(defaultInitialValue);
  const fragment = useFragment<Value, Value>();
  return useWire<Value>(fragment.value$, externalValue);
}
