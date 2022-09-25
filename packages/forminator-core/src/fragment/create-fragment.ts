import { createWire, ReadonlyWire } from '@forminator/react-wire';
import { createId } from '../utils/id';
import { none, Option } from '@forminator/option';
import { ValueComposer } from '../value-composer/value-composer';
import { FORMINATOR_FRAGMENT, ForminatorFragment } from './forminator-fragment';

export function createFragment<IValue, EValue>(
  initialValue?: IValue,
): ForminatorFragment<IValue, EValue> {
  return {
    [FORMINATOR_FRAGMENT]: true,
    id: createId('fragment-'),
    initialValue: none(),
    externalValue$$: createWire<Option<ReadonlyWire<Option<EValue>>>>(none()),
    composer$: createWire<Option<ValueComposer<IValue, EValue>>>(none()),
    value$: createWire(initialValue),
    finalValue$$: createWire<Option<ReadonlyWire<Option<EValue>>>>(none()),
    stateWires$: createWire({}),
    finalStateWires$: createWire({}),
  };
}
