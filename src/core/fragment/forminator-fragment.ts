import { ReadonlyWire, Wire } from '@forminator/react-wire';
import { StateWire } from '../state-composer/state-composer';
import { Option } from '../../utils/option';
import { ValueComposer } from '../value-composer/value-composer';

export interface ForminatorFragment<IValue, EValue> {
  readonly id: string;
  composer$: Wire<Option<ValueComposer<IValue, EValue>>>;
  value$: Wire<IValue>;
  finalValue$$: Wire<Option<ReadonlyWire<Option<EValue>>>>;
  stateWires$: Wire<Partial<Record<string, StateWire<any>>>>;
  finalStateWires$: Wire<Partial<Record<string, ReadonlyWire<any, any>>>>;
}
