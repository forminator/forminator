export const FORMINATOR_OPTION = Symbol('FORMINATOR_OPTION');

export type Some<Value> = {
  some: true;
  value: Value;
} & OptionFns<Value>;
export type None<Value> = {
  some: false;
} & OptionFns<Value>;
export type Option<Value> = Some<Value> | None<Value>;

export interface OptionFns<Value> {
  readonly [FORMINATOR_OPTION]: true;

  ok(this: Option<Value>): Value;

  or(this: Option<Value>, value: Value): Value;

  map<T>(this: Option<Value>, fn: (value: Value) => T): Option<T>;

  isSome(this: Option<Value>): this is Some<Value>;

  isNone(this: Option<Value>): this is None<Value>;
}

function getOptionFns<Value>(): OptionFns<Value> {
  return {
    [FORMINATOR_OPTION]: true,
    ok() {
      return ok(this);
    },
    or(this: Option<Value>, value: Value) {
      return or(this, value);
    },
    map<T>(this: Option<Value>, fn: (value: Value) => T) {
      return mapOption(this, fn);
    },
    isSome() {
      return isSome(this);
    },
    isNone(this: Option<Value>) {
      return isNone(this);
    },
  };
}

const optionFns = getOptionFns<any>();

export function some<Value>(value: Value): Some<Value> & OptionFns<Value> {
  return Object.assign(Object.create(optionFns), { some: true, value });
}

export function none<Value>(): None<Value> {
  return Object.assign(Object.create(optionFns), { some: false });
}

export function isOption(value: any): value is Option<unknown> {
  return !!(value && value[FORMINATOR_OPTION]);
}

function isSome<Value>(
  option: Option<Value>,
): option is Some<Value> & OptionFns<Value> {
  return option.some;
}

function isNone<Value>(option: Option<Value>): option is None<Value> {
  return !option.some;
}

export class NoneError extends Error {
  constructor() {
    super(`value is None.`) /* istanbul ignore next */;

    this.name = 'NoneError';
    Object.setPrototypeOf(this, NoneError.prototype);
  }
}

function ok<Value>(option: Option<Value>): Value {
  if (isSome(option)) {
    return option.value;
  }
  throwNoneError();
}

function or<Value>(option: Option<Value>, value: Value): Value {
  if (isSome(option)) {
    return option.value;
  }
  return value;
}

export function isNoneError(e: any): e is NoneError {
  return e instanceof NoneError;
}

export function throwNoneError(): never {
  throw new NoneError();
}

export function catchNoneError<R>(fn: () => R): Option<R> {
  try {
    return some(fn());
  } catch (e) {
    if (isNoneError(e)) {
      return none();
    }
    throw e;
  }
}

function mapOption<V, T>(option: Option<V>, fn: (v: V) => T): Option<T> {
  if (isNone(option)) {
    return none();
  }
  return some(fn(option.value));
}

export function intoOption<Value>(value: Value | undefined): Option<Value> {
  if (value === undefined) {
    return none();
  }
  return some(value);
}

export function fromOption<Value>(option: Option<Value>): Value | undefined {
  return option.isSome() ? option.value : undefined;
}
