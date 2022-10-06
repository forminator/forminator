import { Defined } from '@forminator/option';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Option } from '@forminator/core';

export type ExternalValueContextType<EValue extends Defined> = Option<EValue>;
export const ExternalValueContext = createContext<
  ExternalValueContextType<any> | undefined
>(undefined);

export function useExternalValueContext<
  EValue extends Defined,
>(): ExternalValueContextType<EValue> {
  const context = useContext(ExternalValueContext);
  if (context === undefined) {
    throw new Error(
      'useExternalValueContext must be used inside the <ExternalValueContextProvider/>',
    );
  }
  return context;
}

interface ExternalValueContextProviderOwnProps<EValue extends Defined> {
  value: ExternalValueContextType<EValue>;
}

type ExternalValueContextProviderProps<EValue extends Defined> =
  PropsWithChildren<ExternalValueContextProviderOwnProps<EValue>>;

export function ExternalValueContextProvider<EValue extends Defined>(
  props: ExternalValueContextProviderProps<EValue>,
) {
  return (
    <ExternalValueContext.Provider value={props.value}>
      {props.children}
    </ExternalValueContext.Provider>
  );
}
