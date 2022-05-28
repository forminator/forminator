import { ForminatorFragment } from '@forminator/core';
import { useFragmentContext } from './contexts/fragment-context';

export function useFragment<IValue, EValue>(): ForminatorFragment<
  IValue,
  EValue
> {
  return useFragmentContext();
}
