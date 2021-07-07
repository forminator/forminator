import React, { createContext, PropsWithChildren, useContext } from 'react';

export type ExternalValueContextType<EValue> = EValue;
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

interface OwnProps<EValue> {
  value: ExternalValueContextType<EValue>;
}

type Props<EValue> = PropsWithChildren<OwnProps<EValue>>;

export function ExternalValueContextProvider<EValue>(props: Props<EValue>) {
  return (
    <ExternalValueContext.Provider value={props.value}>
      {props.children}
    </ExternalValueContext.Provider>
  );
}
