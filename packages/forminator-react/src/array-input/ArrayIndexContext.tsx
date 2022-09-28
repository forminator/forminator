import { createContext, PropsWithChildren, useContext } from 'react';

export type ArrayIndexContextType = number;
export const ArrayIndexContext = createContext<
  ArrayIndexContextType | undefined
>(undefined);

export function useArrayIndexContext(): ArrayIndexContextType {
  const context = useContext(ArrayIndexContext);
  if (context === undefined) {
    throw new Error(
      'useArrayIndexContext must be used inside the <ArrayIndexContextProvider/>',
    );
  }
  return context;
}

interface OwnProps {
  value: ArrayIndexContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function ArrayIndexContextProvider(props: Props) {
  return (
    <ArrayIndexContext.Provider value={props.value}>
      {props.children}
    </ArrayIndexContext.Provider>
  );
}
