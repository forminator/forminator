import { Defined } from '@forminator/core';
import { Dispatch } from 'react';
import { ForminatorFragment } from '@forminator/core';
import { Option as Option_2 } from '@forminator/core';
import { PropsWithChildren } from 'react';
import { ReactNode } from 'react';
import { ValueComposer } from '@forminator/core';
import { Wire } from '@forminator/react-wire';

declare const ADD_FIELD = 'ADD_FIELD';

declare const ADD_ITEM = 'ADD_ITEM';

export declare function addField(
  field: string,
  fragment: ForminatorFragment<Defined, Defined>,
): DictInputActionTypes;

declare interface AddFieldAction {
  type: typeof ADD_FIELD;
  payload: {
    field: string;
    fragment: ForminatorFragment<Defined, Defined>;
  };
}

export declare function addItem<IV extends Defined, EV extends Defined>(
  index: number,
  fragment: ForminatorFragment<IV, EV>,
): ArrayInputActionTypes<IV, EV>;

declare interface AddItemAction<IV extends Defined, EV extends Defined> {
  type: typeof ADD_ITEM;
  payload: {
    index: number;
    fragment: ForminatorFragment<IV, EV>;
  };
}

declare type ArrayIndexContextType = number;

export declare function ArrayInput(props: ArrayInputProps): JSX.Element;

declare type ArrayInputActionTypes<
  IV extends Defined = Defined,
  EV extends Defined = Defined,
> = AddItemAction<IV, EV> | RemoveItemAction | MoveItemAction;

declare type ArrayInputDispatchContextType<
  IV extends Defined,
  EV extends Defined,
> = Dispatch<ArrayInputActionTypes<IV, EV>>;

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

declare type DictInputActionTypes = AddFieldAction | RemoveFieldAction;

declare type DictInputDispatchContextType = Dispatch<DictInputActionTypes>;

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

export declare function ExternalValueContextProvider<EValue extends Defined>(
  props: ExternalValueContextProviderProps<EValue>,
): JSX.Element;

declare interface ExternalValueContextProviderOwnProps<EValue extends Defined> {
  value: ExternalValueContextType<EValue>;
}

declare type ExternalValueContextProviderProps<EValue extends Defined> =
  PropsWithChildren<ExternalValueContextProviderOwnProps<EValue>>;

declare type ExternalValueContextType<EValue extends Defined> =
  Option_2<EValue>;

export declare function Forminator<
  IValue extends Defined,
  EValue extends Defined,
>(props: ForminatorProps<IValue, EValue>): JSX.Element;

export declare interface ForminatorProps<
  IValue extends Defined,
  EValue extends Defined,
> {
  externalValue?: EValue;
  rootFragment?: ForminatorFragment<IValue, EValue>;
  children?: ReactNode | undefined;
}

export declare function FragmentContextProvider<
  IValue extends Defined,
  EValue extends Defined,
>(props: FragmentContextProviderProps<IValue, EValue>): JSX.Element;

declare interface FragmentContextProviderOwnProps<
  IValue extends Defined,
  EValue extends Defined,
> {
  value: FragmentContextType<IValue, EValue>;
}

declare type FragmentContextProviderProps<
  IValue extends Defined,
  EValue extends Defined,
> = PropsWithChildren<FragmentContextProviderOwnProps<IValue, EValue>>;

declare type FragmentContextType<
  IValue extends Defined,
  EValue extends Defined,
> = ForminatorFragment<IValue, EValue>;

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

declare const REMOVE_FIELD = 'REMOVE_FIELD';

declare const REMOVE_ITEM = 'REMOVE_ITEM';

export declare function removeField(field: string): DictInputActionTypes;

declare interface RemoveFieldAction {
  type: typeof REMOVE_FIELD;
  payload: {
    field: string;
  };
}

export declare function removeItem(index: number): ArrayInputActionTypes;

declare interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: {
    index: number;
  };
}

export declare function useArrayIndexContext(): ArrayIndexContextType;

export declare function useArrayInputDispatchContext<
  IV extends Defined,
  EV extends Defined,
>(): ArrayInputDispatchContextType<IV, EV>;

export declare function useComposer<
  IValue extends Defined,
  EValue extends Defined,
>(composer: ValueComposer<IValue, EValue>): void;

export declare function useDictInputDispatchContext(): DictInputDispatchContextType;

export declare function useExternalValue<
  Value extends Defined,
>(): Option_2<Value>;

export declare function useFragment<
  IValue extends Defined,
  EValue extends Defined,
>(): ForminatorFragment<IValue, EValue>;

export declare function useInputValue$<Value extends Defined>(): Wire<
  Value | undefined
>;

export declare function useInputValue$<Value extends Defined>(
  defaultInitialValue: Value,
): Wire<Value>;

export declare function useRootFragment<
  IValue extends Defined,
  EValue extends Defined,
>(): ForminatorFragment<IValue, EValue>;

export {};
