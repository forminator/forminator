import { Defined } from '@forminator/option';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { ForminatorFragment } from '@forminator/core';

export type FragmentContextType<
  IValue extends Defined,
  EValue extends Defined,
> = ForminatorFragment<IValue, EValue>;
export const FragmentContext = createContext<
  FragmentContextType<any, any> | undefined
>(undefined);

export function useFragmentContext<
  IValue extends Defined,
  EValue extends Defined,
>(): FragmentContextType<IValue, EValue> {
  const context = useContext(FragmentContext);
  if (context === undefined) {
    throw new Error(
      'useFragmentContext must be used inside the <FragmentContextProvider/>',
    );
  }
  return context;
}

interface FragmentContextProviderOwnProps<
  IValue extends Defined,
  EValue extends Defined,
> {
  value: FragmentContextType<IValue, EValue>;
}

type FragmentContextProviderProps<
  IValue extends Defined,
  EValue extends Defined,
> = PropsWithChildren<FragmentContextProviderOwnProps<IValue, EValue>>;

export function FragmentContextProvider<
  IValue extends Defined,
  EValue extends Defined,
>(props: FragmentContextProviderProps<IValue, EValue>) {
  return (
    <FragmentContext.Provider value={props.value}>
      {props.children}
    </FragmentContext.Provider>
  );
}
