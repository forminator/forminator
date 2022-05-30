import { ForminatorFragment } from '@forminator/core';
import { Option as Option_2 } from '@forminator/core';
import { ReactNode } from 'react';
import { ValueComposer } from '@forminator/core';
import { Wire } from '@forminator/react-wire';

export declare function Forminator<IValue, EValue>(
  props: ForminatorProps<IValue, EValue>,
): JSX.Element;

export declare interface ForminatorProps<IValue, EValue> {
  externalValue?: EValue;
  rootFragment?: ForminatorFragment<IValue, EValue>;
  children?: ReactNode | undefined;
}

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
