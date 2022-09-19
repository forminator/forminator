export declare function catchNoneError<R>(fn: () => R): Option_2<R>;

declare const FORMINATOR_OPTION: unique symbol;

export declare function fromOption<Value>(
  option: Option_2<Value>,
): Value | undefined;

export declare function intoOption<Value>(
  value: Value | undefined,
): Option_2<Value>;

export declare function isNoneError(e: any): e is NoneError;

export declare function isOption(value: any): value is Option_2<unknown>;

export declare type None<Value> = {
  some: false;
} & OptionFns<Value>;

export declare function none<Value>(): None<Value>;

export declare class NoneError extends Error {
  constructor();
}

declare type Option_2<Value> = Some<Value> | None<Value>;
export { Option_2 as Option };

export declare interface OptionFns<Value> {
  readonly [FORMINATOR_OPTION]: true;
  ok(this: Option_2<Value>): Value;
  or(this: Option_2<Value>, value: Value): Value;
  map<T>(this: Option_2<Value>, fn: (value: Value) => T): Option_2<T>;
  isSome(this: Option_2<Value>): this is Some<Value>;
  isNone(this: Option_2<Value>): this is None<Value>;
}

export declare type Some<Value> = {
  some: true;
  value: Value;
} & OptionFns<Value>;

export declare function some<Value extends {} | null>(
  value: Value,
): Some<Value> & OptionFns<Value>;

export declare function throwNoneError(): never;

export {};
