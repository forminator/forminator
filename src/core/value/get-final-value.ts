import { createSelector, ReadonlyWire } from '@forminator/react-wire';
import { ForminatorFragment } from '../fragment/forminator-fragment';
import { catchNoneError, intoOption, Option, some } from '../../utils/option';

type Getters = {
  getWireValue: <Value>(wire: ReadonlyWire<Value>) => Value;
  getFragmentValue: <IValue, EValue>(
    fragment: ForminatorFragment<IValue, EValue>,
  ) => Option<EValue>;
};

export function _getFinalValue<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
  { getWireValue, getFragmentValue }: Getters,
): Option<EValue> {
  return catchNoneError(() => {
    const composer = getWireValue(fragment.composer$).ok();
    const value = getWireValue(fragment.value$);

    return composer.compose(intoOption(value).ok(), {
      get: (f) => getFragmentValue(f).ok(),
    });
  });
}

export function getFinalValue<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
): Option<EValue> {
  return _getFinalValue(fragment, {
    getWireValue: (w) => w.getValue(),
    getFragmentValue: getFinalValue,
  });
}

function createFinalValue$<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
) {
  return createSelector<Option<EValue>>({
    get: ({ get }): Option<EValue> => {
      return _getFinalValue(fragment, {
        getWireValue: get,
        getFragmentValue: (f) => get(getFinalValue$(f)),
      });
    },
  });
}

export function getFinalValue$<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
): ReadonlyWire<Option<EValue>> {
  const finalValue$Option = fragment.finalValue$$.getValue();
  if (finalValue$Option.isSome()) {
    return finalValue$Option.value;
  }
  const finalValue$ = createFinalValue$(fragment);
  fragment.finalValue$$.setValue(some(finalValue$));
  return finalValue$;
}
