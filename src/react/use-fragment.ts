import { FragmentContextType, useFragmentContext } from './fragment-context';

export function useFragment<IValue, EValue>(): FragmentContextType<
  IValue,
  EValue
> {
  return useFragmentContext();
}
