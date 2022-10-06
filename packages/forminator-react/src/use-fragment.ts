import { ForminatorFragment } from '@forminator/core';
import { Defined } from '@forminator/core';
import { useFragmentContext } from './contexts/fragment-context';

export function useFragment<
  IValue extends Defined,
  EValue extends Defined,
>(): ForminatorFragment<IValue, EValue> {
  return useFragmentContext();
}
