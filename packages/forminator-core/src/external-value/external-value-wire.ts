import { catchNoneError, Option } from '@forminator/option';
import { createSelector, ReadonlyWire } from '@forminator/react-wire';
import { ForminatorFragment } from '../fragment/forminator-fragment';
import { ValueSelector } from '../value_selector/value-selector';

export function createSelectedExternalValue$<PEValue, FEValue>(
  parentFragment: ForminatorFragment<unknown, PEValue>,
  selector$: ReadonlyWire<ValueSelector<PEValue, FEValue>>,
): ReadonlyWire<Option<FEValue>> {
  return createSelector({
    get: ({ get }): Option<FEValue> => {
      return catchNoneError((): FEValue => {
        const selector = get(selector$)
        return selector(
          get(get(parentFragment.externalValue$$).unwrap()).unwrap(),
        );
      });
    },
  });
}
