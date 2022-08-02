import { Wire } from '@forminator/react-wire';
import { Dispatch, useCallback } from 'react';

export type Reducer<S, A> = (prevState: S, action: A) => S;
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any>
  ? S
  : never;

type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<
  any,
  infer A
>
  ? A
  : never;

export function useWireReducer<R extends Reducer<any, any>>(
  reducer: R,
  wire: Wire<ReducerState<R>>,
): Dispatch<ReducerAction<R>> {
  return useCallback(
    (action: ReducerAction<R>) => {
      wire.setValue(reducer(wire.getValue(), action));
    },
    [reducer, wire],
  );
}
