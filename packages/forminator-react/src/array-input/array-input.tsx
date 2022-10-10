import { createFragment, intoOption } from '@forminator/core';
import { useWire } from '@forminator/react-wire';
import { ReactNode } from 'react';
import { useComposer } from '../use-composer';
import { useFragment } from '../use-fragment';
import { useWireReducer } from '../utils/wire-reducer';
import { arrayInputComposer } from './array-input-composer';
import { ArrayInputDispatchContextProvider } from './ArrayInputDispatchContext';
import { arrayInputReducer } from './reducer';
import { ArrayFragment } from './types';

export interface ArrayInputProps {
  children?: ReactNode;
}

export function ArrayInput(props: ArrayInputProps) {
  const fragment = useFragment<ArrayFragment, Array<unknown>>();

  const value$ = useWire<ArrayFragment>(fragment.value$, () => {
    const initialValue = fragment.initialValue.unwrap_or([]);
    return initialValue.map((itemInitialValue) => {
      return createFragment(intoOption(itemInitialValue));
    });
  });

  useComposer(arrayInputComposer);

  const dispatch = useWireReducer(arrayInputReducer, value$);
  return (
    <ArrayInputDispatchContextProvider value={dispatch}>
      {props.children}
    </ArrayInputDispatchContextProvider>
  );
}
