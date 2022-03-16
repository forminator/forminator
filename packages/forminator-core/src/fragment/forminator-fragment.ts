import { ReadonlyWire, Wire } from '@forminator/react-wire';
import { StateWire } from '../state-composer/state-composer';
import { Option } from '../utils/option';
import { ValueComposer } from '../value-composer/value-composer';

export const FORMINATOR_FRAGMENT = Symbol('FORMINATOR_FRAGMENT');

export interface ForminatorFragment<IValue, EValue> {
  readonly [FORMINATOR_FRAGMENT]: true;
  readonly id: string;
  composer$: Wire<Option<ValueComposer<IValue, EValue>>>;
  value$: Wire<IValue | undefined>;
  finalValue$$: Wire<Option<ReadonlyWire<Option<EValue>>>>;
  stateWires$: Wire<Partial<Record<string, StateWire<any>>>>;
  finalStateWires$: Wire<Partial<Record<string, ReadonlyWire<any, any>>>>;
}

export function isForminatorFragment<IValue, EValue>(
  value: any,
): value is ForminatorFragment<IValue, EValue> {
  return value && value[FORMINATOR_FRAGMENT] === true;
}
