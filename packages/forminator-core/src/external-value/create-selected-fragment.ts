import { some } from '@forminator/option';
import { ReadonlyWire } from '@forminator/react-wire';
import { createSelectedExternalValue$ } from './external-value-wire';
import { ValueSelector } from '../value_selector/value-selector';
import { createFragment } from '../fragment/create-fragment';
import { ForminatorFragment } from '../fragment/forminator-fragment';

export function createSelectedFragment<IValue, EValue, PEValue>(
  fragment: ForminatorFragment<any, PEValue>,
  selector$: ReadonlyWire<ValueSelector<PEValue, EValue>>,
): ForminatorFragment<IValue, EValue> {
  const cFragment = createFragment<IValue, EValue>();
  // const selector = selector$.getValue();
  // cFragment.initialValue = fragment.initialValue.map(selector);
  cFragment.externalValue$$.setValue(
    some(createSelectedExternalValue$(fragment, selector$)),
  );
  return cFragment;
}
