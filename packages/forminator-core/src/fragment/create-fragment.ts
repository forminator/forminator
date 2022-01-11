import { createWire, ReadonlyWire } from '@forminator/react-wire';
import { createId } from '../utils/id';
import { none, Option } from '../utils/option';
import { ValueComposer } from '../value-composer/value-composer';
import { ForminatorFragment } from './forminator-fragment';

export function createFragment<IValue, EValue>(
  initialValue?: IValue,
): ForminatorFragment<IValue, EValue> {
  return {
    id: createId('fragment-'),
    composer$: createWire<Option<ValueComposer<IValue, EValue>>>(none()),
    value$: createWire(initialValue),
    finalValue$$: createWire<Option<ReadonlyWire<Option<EValue>>>>(none()),
    stateWires$: createWire({}),
    finalStateWires$: createWire({}),
  };
}
