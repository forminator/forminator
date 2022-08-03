import { createContext, Dispatch, PropsWithChildren, useContext } from 'react';
import { DictInputActionTypes } from './reducer';

export type DictInputDispatchContextType = Dispatch<DictInputActionTypes>;
export const DictInputDispatchContext = createContext<
  DictInputDispatchContextType | undefined
>(undefined);

export function useDictInputDispatchContext(): DictInputDispatchContextType {
  const context = useContext(DictInputDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useDictInputDispatchContext must be used inside the <DictInputDispatchContextProvider/>',
    );
  }
  return context;
}

interface OwnProps {
  value: DictInputDispatchContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function DictInputDispatchContextProvider(props: Props) {
  return (
    <DictInputDispatchContext.Provider value={props.value}>
      {props.children}
    </DictInputDispatchContext.Provider>
  );
}
