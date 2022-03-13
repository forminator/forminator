import { ReadonlyWire } from '@forminator/react-wire';
import { Wire } from '@forminator/react-wire';

export declare function createFragment<IValue, EValue>(
  initialValue?: IValue,
): ForminatorFragment<IValue, EValue>;

export declare function createId(prefix?: string): string;

export declare interface ForminatorFragment<IValue, EValue> {
  readonly id: string;
  composer$: Wire<Option_2<ValueComposer<IValue, EValue>>>;
  value$: Wire<IValue | undefined>;
  finalValue$$: Wire<Option_2<ReadonlyWire<Option_2<EValue>>>>;
  stateWires$: Wire<Partial<Record<string, StateWire<any>>>>;
  finalStateWires$: Wire<Partial<Record<string, ReadonlyWire<any, any>>>>;
}

export declare function fromOption<Value>(
  option: Option_2<Value>,
): Value | undefined;

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

export declare type Getters = {
  getWireValue: <Value>(wire: ReadonlyWire<Value>) => Value;
  get: <IValue, EValue>(fragment: ForminatorFragment<IValue, EValue>) => EValue;
};

export declare function intoOption<Value>(
  value: Value | undefined,
): Option_2<Value>;

export declare type None<Value> = {
  some: false;
} & OptionFns<Value>;

export declare function none<Value>(): None<Value>;

declare type Option_2<Value> = Some<Value> | None<Value>;
export { Option_2 as Option };

export declare interface OptionFns<Value> {
  ok(this: Option_2<Value>): Value;
  or(this: Option_2<Value>, value: Value): Value;
  map<T>(this: Option_2<Value>, fn: (value: Value) => T): Option_2<T>;
  isSome(this: Option_2<Value>): this is Some<Value>;
  isNone(this: Option_2<Value>): this is None<Value>;
}

export declare function setComposer<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
  composer: ValueComposer<IValue, EValue>,
): void;

export declare type Some<Value> = {
  some: true;
  value: Value;
} & OptionFns<Value>;

export declare function some<Value>(
  value: Value,
): Some<Value> & OptionFns<Value>;

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
  compose(value: IValue, options: Getters): EValue;
  getFragments(
    value: IValue,
    options: Getters,
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
