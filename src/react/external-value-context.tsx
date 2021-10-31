import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Option } from '../utils/option';

export type ExternalValueContextType<EValue> = Option<EValue>;
export const ExternalValueContext = createContext<
  ExternalValueContextType<any> | undefined
>(undefined);

export function useExternalValueContext<
  EValue
>(): ExternalValueContextType<EValue> {
  const context = useContext(ExternalValueContext);
  if (context === undefined) {
    throw new Error(
      'useExternalValueContext must be used inside the <ExternalValueContextProvider/>',
    );
  }
  return context;
}

interface ExternalValueContextProviderOwnProps<EValue> {
  value: ExternalValueContextType<EValue>;
}

type ExternalValueContextProviderProps<EValue> = PropsWithChildren<
  ExternalValueContextProviderOwnProps<EValue>
>;

export function ExternalValueContextProvider<EValue>(
  props: ExternalValueContextProviderProps<EValue>,
) {
  return (
    <ExternalValueContext.Provider value={props.value}>
      {props.children}
    </ExternalValueContext.Provider>
  );
}
