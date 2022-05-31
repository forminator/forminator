import { fromOption } from '@forminator/option';
import { intoOption } from '@forminator/option';
import { isOption } from '@forminator/option';
import { None } from '@forminator/option';
import { none } from '@forminator/option';
import { Option as Option_2 } from '@forminator/option';
import { OptionFns } from '@forminator/option';
import { ReadonlyWire } from '@forminator/react-wire';
import { Some } from '@forminator/option';
import { some } from '@forminator/option';
import { Wire } from '@forminator/react-wire';

export declare function createFragment<IValue, EValue>(
  initialValue?: IValue,
): ForminatorFragment<IValue, EValue>;

export declare function createId(prefix?: string): string;

declare const FORMINATOR_FRAGMENT: unique symbol;

export declare interface ForminatorFragment<IValue, EValue> {
  readonly [FORMINATOR_FRAGMENT]: true;
  readonly id: string;
  composer$: Wire<Option_2<ValueComposer<IValue, EValue>>>;
  value$: Wire<IValue | undefined>;
  finalValue$$: Wire<Option_2<ReadonlyWire<Option_2<EValue>>>>;
  stateWires$: Wire<Partial<Record<string, StateWire<any>>>>;
  finalStateWires$: Wire<Partial<Record<string, ReadonlyWire<any, any>>>>;
}

export { fromOption };

export declare function getFinalState$<
  IValue,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
): ReadonlyWire<Option_2<SD['finalState']>>;

export declare function getFinalState<
  IValue,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
): Option_2<SD['finalState']>;

export declare function getFinalValue$<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
): ReadonlyWire<Option_2<EValue>>;

export declare function getFinalValue<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
): Option_2<EValue>;

export declare function getState$<
  IValue,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
  ...args: SD['args']
): StateWire<SD>;

export declare type GetValue = <Value>(
  v: ForminatorFragment<any, Value> | ReadonlyWire<Value>,
) => Value;

export { intoOption };

export declare function isForminatorFragment<IValue, EValue>(
  value: any,
): value is ForminatorFragment<IValue, EValue>;

export { isOption };

export { None };

export { none };

export { Option_2 as Option };

export { OptionFns };

export declare function setComposer<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
  composer: ValueComposer<IValue, EValue>,
): void;

export { Some };

export { some };

export declare interface StateComposer<
  SD extends StateDefinition<any, any, any, any>,
> {
  compose(
    state: Option_2<SD['state']>,
    states: SD['finalState'][],
  ): SD['finalState'];
  create(...args: SD['args']): StateWire<SD>;
  getKey(): string;
}

export declare interface StateDefinition<
  FinalState,
  State,
  Fns,
  Args extends any[],
> {
  finalState: FinalState;
  state: State;
  fns: Fns;
  args: Args;
}

export declare type StateWire<SD extends StateDefinition<any, any, any, any>> =
  ReadonlyWire<SD['state'], SD['fns']>;

export declare interface ValueComposer<IValue, EValue> {
  compose(
    value: IValue,
    options: {
      get: GetValue;
    },
  ): EValue;
  getFragments(
    value: IValue,
    options: {
      get: GetValue;
    },
  ): ForminatorFragment<unknown, any>[];
}

export declare function waitForFinalState<
  IValue,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
): Promise<SD['finalState']>;

export declare function waitForFinalValue<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
): Promise<EValue>;

export declare function waitForSomeValue<T>(
  wire: ReadonlyWire<Option_2<T>>,
): Promise<T>;

export {};
