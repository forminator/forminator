import { Option } from '@forminator/core';
import { Defined } from '@forminator/core';
import { useExternalValueContext } from './contexts/external-value-context';

export function useExternalValue<Value extends Defined>(): Option<Value> {
  return useExternalValueContext();
}
