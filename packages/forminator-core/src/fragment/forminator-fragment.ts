import { ReadonlyWire, Wire } from '@forminator/react-wire';
import { StateWire } from '../state-composer/state-composer';
import { Defined, Option } from '@forminator/option';
import { ValueComposer } from '../value-composer/value-composer';

export const FORMINATOR_FRAGMENT = Symbol('FORMINATOR_FRAGMENT');

export interface ForminatorFragment<
  IValue extends Defined,
  EValue extends Defined,
> {
  readonly [FORMINATOR_FRAGMENT]: true;
  readonly id: string;
  initialValue: Option<EValue>;
  composer$: Wire<Option<ValueComposer<IValue, EValue>>>;
  value$: Wire<IValue | undefined>;
  finalValue$$: Wire<Option<ReadonlyWire<Option<EValue>>>>;
  stateWires$: Wire<Partial<Record<string, StateWire<any>>>>;
  finalStateWires$: Wire<Partial<Record<string, ReadonlyWire<any, any>>>>;
}

export function isForminatorFragment<
  IValue extends Defined,
  EValue extends Defined,
>(value: any): value is ForminatorFragment<IValue, EValue> {
  return value && value[FORMINATOR_FRAGMENT] === true;
}
