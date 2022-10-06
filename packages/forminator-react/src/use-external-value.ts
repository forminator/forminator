import { Option } from '@forminator/core';
import { Defined } from '@forminator/option';
import { useExternalValueContext } from './contexts/external-value-context';

export function useExternalValue<Value extends Defined>(): Option<Value> {
  return useExternalValueContext();
}
