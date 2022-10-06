export declare function catchNoneError<R>(fn: () => R): Option_2<R & Defined>;

export declare type Defined = {} | null;

declare const FORMINATOR_OPTION: unique symbol;

export declare function fromOption<Value extends Defined>(
  option: Option_2<Value>,
): Value | undefined;

export declare function intoOption<Value>(
  value: Value | undefined,
): Option_2<Value & Defined>;

export declare function isNoneError(e: any): e is NoneError;

export declare function isOption(
  value: any,
): value is Option_2<unknown & Defined>;

export declare type None<Value extends Defined> = {
  some: false;
} & OptionFns<Value>;

export declare function none<Value extends Defined>(): None<Value>;

export declare class NoneError extends Error {
  constructor();
}

declare type Option_2<Value extends Defined> = Some<Value> | None<Value>;
export { Option_2 as Option };

export declare interface OptionFns<Value extends Defined> {
  readonly [FORMINATOR_OPTION]: true;
  unwrap(this: Option_2<Value>): Value;
  unwrap_or(this: Option_2<Value>, value: Value): Value;
  or(this: Option_2<Value>, value: Option_2<Value>): Option_2<Value>;
  map<T>(this: Option_2<Value>, fn: (value: Value) => T): Option_2<T & Defined>;
  isSome(this: Option_2<Value>): this is Some<Value>;
  isNone(this: Option_2<Value>): this is None<Value>;
}

export declare type Some<Value extends Defined> = {
  some: true;
  value: Value;
} & OptionFns<Value>;

export declare function some<Value extends Defined>(
  value: Value,
): Some<Value> & OptionFns<Value>;

export declare function throwNoneError(): never;

export {};
