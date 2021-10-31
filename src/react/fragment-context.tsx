import React, { createContext, PropsWithChildren, useContext } from 'react';
import { ForminatorFragment } from '../core/fragment/forminator-fragment';

export type FragmentContextType<IValue, EValue> = ForminatorFragment<
  IValue,
  EValue
>;
export const FragmentContext = createContext<
  FragmentContextType<any, any> | undefined
>(undefined);

export function useFragmentContext<IValue, EValue>(): FragmentContextType<
  IValue,
  EValue
> {
  const context = useContext(FragmentContext);
  if (context === undefined) {
    throw new Error(
      'useFragmentContext must be used inside the <FragmentContextProvider/>',
    );
  }
  return context;
}

interface FragmentContextProviderOwnProps<IValue, EValue> {
  value: FragmentContextType<IValue, EValue>;
}

type FragmentContextProviderProps<IValue, EValue> = PropsWithChildren<
  FragmentContextProviderOwnProps<IValue, EValue>
>;

export function FragmentContextProvider<IValue, EValue>(
  props: FragmentContextProviderProps<IValue, EValue>,
) {
  return (
    <FragmentContext.Provider value={props.value}>
      {props.children}
    </FragmentContext.Provider>
  );
}
