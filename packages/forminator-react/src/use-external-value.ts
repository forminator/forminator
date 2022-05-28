import { Option } from '@forminator/core';
import { useExternalValueContext } from './contexts/external-value-context';

export function useExternalValue<Value>(): Option<Value> {
  return useExternalValueContext();
}
