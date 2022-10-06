import { FirmMap } from './firm-map';

export const FORMINATOR_OPTION = Symbol('FORMINATOR_OPTION');
export type Defined = {} | null;
export type Some<Value extends Defined> = {
  some: true;
  value: Value;
} & OptionFns<Value>;
export type None<Value extends Defined> = {
  some: false;
} & OptionFns<Value>;
export type Option<Value extends Defined> = Some<Value> | None<Value>;

export interface OptionFns<Value extends Defined> {
  readonly [FORMINATOR_OPTION]: true;

  unwrap(this: Option<Value>): Value;

  unwrap_or(this: Option<Value>, value: Value): Value;

  or(this: Option<Value>, value: Option<Value>): Option<Value>;

  map<T>(this: Option<Value>, fn: (value: Value) => T): Option<T & Defined>;

  isSome(this: Option<Value>): this is Some<Value>;

  isNone(this: Option<Value>): this is None<Value>;
}

function getOptionFns<Value extends Defined>(): OptionFns<Value> {
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

function createSome<Value extends Defined>(
  value: Value,
): Some<Value> & OptionFns<Value> {
  if (value === undefined) {
    throw new Error("some value can't be undefined");
  }
  return Object.assign(Object.create(optionFns), { some: true, value });
}

function createNone<Value extends Defined>(): None<Value> {
  return Object.assign(Object.create(optionFns), { some: false });
}

const theNone = createNone<any>();

const cache = new FirmMap<any, Some<any>>();

export function some<Value extends Defined>(
  value: Value,
): Some<Value> & OptionFns<Value> {
  if (!cache.has(value)) {
    cache.set(value, createSome(value));
  }
  return cache.get(value)!;
}

export function none<Value extends Defined>(): None<Value> {
  return theNone;
}

export function isOption(value: any): value is Option<unknown & Defined> {
  return !!(value && value[FORMINATOR_OPTION]);
}

function isSome<Value extends Defined>(
  option: Option<Value>,
): option is Some<Value> & OptionFns<Value> {
  return option.some;
}

function isNone<Value extends Defined>(
  option: Option<Value>,
): option is None<Value> {
  return !option.some;
}

export class NoneError extends Error {
  constructor() {
    super(`value is None.`) /* istanbul ignore next */;

    this.name = 'NoneError';
    Object.setPrototypeOf(this, NoneError.prototype);
  }
}

function unwrap<Value extends Defined>(option: Option<Value>): Value {
  if (isSome(option)) {
    return option.value;
  }
  throwNoneError();
}

function unwrap_or<Value extends Defined>(
  option: Option<Value>,
  value: Value,
): Value {
  if (isSome(option)) {
    return option.value;
  }
  return value;
}

function or<Value extends Defined>(
  option: Option<Value>,
  value: Option<Value>,
): Option<Value> {
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

export function catchNoneError<R>(fn: () => R): Option<R & Defined> {
  try {
    return intoOption(fn());
  } catch (e) {
    if (isNoneError(e)) {
      return none();
    }
    throw e;
  }
}

function mapOption<V extends Defined, T>(
  option: Option<V>,
  fn: (v: V) => T,
): Option<T & Defined> {
  if (isNone(option)) {
    return none();
  }
  return intoOption(fn(option.value));
}

export function intoOption<Value>(
  value: Value | undefined,
): Option<Value & Defined> {
  if (value === undefined) {
    return none();
  }
  return some(value);
}

export function fromOption<Value extends Defined>(
  option: Option<Value>,
): Value | undefined {
  return option.isSome() ? option.value : undefined;
}
