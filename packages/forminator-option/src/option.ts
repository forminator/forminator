import { FirmMap } from './firm-map';

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

  unwrap(this: Option<Value>): Value;

  unwrap_or(this: Option<Value>, value: Value): Value;

  or(this: Option<Value>, value: Option<Value>): Option<Value>;

  map<T>(this: Option<Value>, fn: (value: Value) => T): Option<T>;

  isSome(this: Option<Value>): this is Some<Value>;

  isNone(this: Option<Value>): this is None<Value>;
}

function getOptionFns<Value>(): OptionFns<Value> {
  return {
    [FORMINATOR_OPTION]: true,
    unwrap() {
      return unwrap(this);
    },
    unwrap_or(value: Value): Value {
      return unwrap_or(this, value);
    },
    or(this: Option<Value>, value: Option<Value>) {
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

function createSome<Value extends {} | null>(
  value: Value,
): Some<Value> & OptionFns<Value> {
  if (value === undefined) {
    throw new Error("some value can't be undefined");
  }
  return Object.assign(Object.create(optionFns), { some: true, value });
}

function createNone<Value>(): None<Value> {
  return Object.assign(Object.create(optionFns), { some: false });
}

const theNone = createNone<any>();

const cache = new FirmMap<any, Some<any>>();

export function some<Value extends {} | null>(
  value: Value,
): Some<Value> & OptionFns<Value> {
  if (!cache.has(value)) {
    cache.set(value, createSome(value));
  }
  return cache.get(value)!;
}

export function none<Value>(): None<Value> {
  return theNone;
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

function unwrap<Value>(option: Option<Value>): Value {
  if (isSome(option)) {
    return option.value;
  }
  throwNoneError();
}

function unwrap_or<Value>(option: Option<Value>, value: Value): Value {
  if (isSome(option)) {
    return option.value;
  }
  return value;
}

function or<Value>(option: Option<Value>, value: Option<Value>): Option<Value> {
  if (isSome(option)) {
    return option;
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
    return intoOption(fn());
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
  return intoOption(fn(option.value));
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
