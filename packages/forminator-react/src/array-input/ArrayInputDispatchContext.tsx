import { createContext, Dispatch, PropsWithChildren, useContext } from 'react';
import { ArrayInputActionTypes } from './reducer';

export type ArrayInputDispatchContextType = Dispatch<ArrayInputActionTypes>;
export const ArrayInputDispatchContext = createContext<
  ArrayInputDispatchContextType | undefined
>(undefined);

export function useArrayInputDispatchContext(): ArrayInputDispatchContextType {
  const context = useContext(ArrayInputDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useArrayInputDispatchContext must be used inside the <ArrayInputDispatchContextProvider/>',
    );
  }
  return context;
}

interface OwnProps {
  value: ArrayInputDispatchContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function ArrayInputDispatchContextProvider(props: Props) {
  return (
    <ArrayInputDispatchContext.Provider value={props.value}>
      {props.children}
    </ArrayInputDispatchContext.Provider>
  );
}
