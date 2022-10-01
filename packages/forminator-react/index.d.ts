import { Dispatch } from 'react';
import { ForminatorFragment } from '@forminator/core';
import { Option as Option_2 } from '@forminator/core';
import { ReactNode } from 'react';
import { ValueComposer } from '@forminator/core';
import { Wire } from '@forminator/react-wire';

declare const ADD_ITEM = 'ADD_ITEM';

export declare function addItem(
  index: number,
  fragment: ForminatorFragment<unknown, unknown>,
): ArrayInputActionTypes;

declare interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: {
    index: number;
    fragment: ForminatorFragment<unknown, unknown>;
  };
}

declare type ArrayIndexContextType = number;

export declare function ArrayInput(props: ArrayInputProps): JSX.Element;

declare type ArrayInputActionTypes =
  | AddItemAction
  | RemoveItemAction
  | MoveItemAction;

declare type ArrayInputDispatchContextType = Dispatch<ArrayInputActionTypes>;

export declare interface ArrayInputProps {
  children?: ReactNode;
}

export declare function ArrayOutput(
  props: ArrayOutputProps,
): JSX.Element | null;

export declare interface ArrayOutputProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

export declare function DictInput(props: DictInputProps): JSX.Element;

export declare function DictInputItem<Value>(
  props: DictInputItemProps<Value>,
): JSX.Element | null;

export declare interface DictInputItemProps<Value> {
  field: string;
  keep?: boolean;
  defaultInitialValue?: Value;
  children?: ReactNode;
}

export declare interface DictInputProps {
  children?: ReactNode;
}

export declare function Forminator<IValue, EValue>(
  props: ForminatorProps<IValue, EValue>,
): JSX.Element;

export declare interface ForminatorProps<IValue, EValue> {
  externalValue?: EValue;
  rootFragment?: ForminatorFragment<IValue, EValue>;
  children?: ReactNode | undefined;
}

declare const MOVE_ITEM = 'MOVE_ITEM';

export declare function moveItem(
  fromIndex: number,
  toIndex: number,
): ArrayInputActionTypes;

declare interface MoveItemAction {
  type: typeof MOVE_ITEM;
  payload: {
    fromIndex: number;
    toIndex: number;
  };
}

declare const REMOVE_ITEM = 'REMOVE_ITEM';

export declare function removeItem(index: number): ArrayInputActionTypes;

declare interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: {
    index: number;
  };
}

export declare function useArrayIndexContext(): ArrayIndexContextType;

export declare function useArrayInputDispatchContext(): ArrayInputDispatchContextType;

export declare function useComposer<IValue, EValue>(
  composer: ValueComposer<IValue, EValue>,
): void;

export declare function useExternalValue<Value>(): Option_2<Value>;

export declare function useFragment<IValue, EValue>(): ForminatorFragment<
  IValue,
  EValue
>;

export declare function useInputValue$<Value>(): Wire<Value | undefined>;

export declare function useInputValue$<Value>(
  defaultInitialValue: Value,
): Wire<Value>;

export declare function useRootFragment<IValue, EValue>(): ForminatorFragment<
  IValue,
  EValue
>;

export {};
