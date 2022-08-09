import { useWire } from '@forminator/react-wire';
import { ReactNode } from 'react';
import { useComposer } from '../use-composer';
import { useFragment } from '../use-fragment';
import { useWireReducer } from '../utils/wire-reducer';
import { dictInputComposer } from './dict-input-composer';
import { DictInputDispatchContextProvider } from './DictInputDispatchContext';
import { dictInputReducer } from './reducer';
import { Dict } from './types';

export interface DictInputProps {
  children?: ReactNode;
}

export function DictInput(props: DictInputProps) {
  const fragment = useFragment<Dict, object>();
  const value$ = useWire<Dict>(fragment.value$, {});

  useComposer(dictInputComposer);

  const dispatch = useWireReducer(dictInputReducer, value$);
  return (
    <DictInputDispatchContextProvider value={dispatch}>
      {props.children}
    </DictInputDispatchContextProvider>
  );
}
