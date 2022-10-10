import { Defined } from '@forminator/core';
import { createContext, Dispatch, PropsWithChildren, useContext } from 'react';
import { ArrayInputActionTypes } from './reducer';

export type ArrayInputDispatchContextType<
  IV extends Defined,
  EV extends Defined,
> = Dispatch<ArrayInputActionTypes<IV, EV>>;
export const ArrayInputDispatchContext = createContext<
  ArrayInputDispatchContextType<any, any> | undefined
>(undefined);

export function useArrayInputDispatchContext<
  IV extends Defined,
  EV extends Defined,
>(): ArrayInputDispatchContextType<IV, EV> {
  const context = useContext(ArrayInputDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useArrayInputDispatchContext must be used inside the <ArrayInputDispatchContextProvider/>',
    );
  }
  return context;
}

interface OwnProps<IV extends Defined, EV extends Defined> {
  value: ArrayInputDispatchContextType<IV, EV>;
}

type Props<IV extends Defined, EV extends Defined> = PropsWithChildren<
  OwnProps<IV, EV>
>;

export function ArrayInputDispatchContextProvider<
  IV extends Defined,
  EV extends Defined,
>(props: Props<IV, EV>) {
  return (
    <ArrayInputDispatchContext.Provider value={props.value}>
      {props.children}
    </ArrayInputDispatchContext.Provider>
  );
}
