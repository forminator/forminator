import { createSelector, ReadonlyWire } from '@forminator/react-wire';
import {
  ForminatorFragment,
  isForminatorFragment,
} from '../fragment/forminator-fragment';
import {
  catchNoneError,
  Defined,
  intoOption,
  Option,
  some,
} from '@forminator/option';
import { waitForSomeValue } from '../utils/option-wire';

type Getters = {
  getWireValue: <Value>(wire: ReadonlyWire<Value>) => Value;
  getFragmentValue: <IValue extends Defined, EValue extends Defined>(
    fragment: ForminatorFragment<IValue, EValue>,
  ) => Option<EValue>;
};

export function _getFinalValue<IValue extends Defined, EValue extends Defined>(
  fragment: ForminatorFragment<IValue, EValue>,
  { getWireValue, getFragmentValue }: Getters,
): Option<EValue> {
  return catchNoneError(() => {
    const composer = getWireValue(fragment.composer$).unwrap();
    const value = getWireValue(fragment.value$);

    return composer.compose(intoOption(value).unwrap(), {
      get: <Value>(
        v: ForminatorFragment<any, Value & Defined> | ReadonlyWire<Value>,
      ): Value => {
        return isForminatorFragment<any, Value & Defined>(v)
          ? getFragmentValue(v).unwrap()
          : getWireValue(v as ReadonlyWire<Value>);
      },
    });
  });
}

export function getFinalValue<IValue extends Defined, EValue extends Defined>(
  fragment: ForminatorFragment<IValue, EValue>,
): Option<EValue> {
  return _getFinalValue(fragment, {
    getWireValue: (w) => w.getValue(),
    getFragmentValue: getFinalValue,
  });
}

function createFinalValue$<IValue extends Defined, EValue extends Defined>(
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

export function getFinalValue$<IValue extends Defined, EValue extends Defined>(
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

export function waitForFinalValue<
  IValue extends Defined,
  EValue extends Defined,
>(fragment: ForminatorFragment<IValue, EValue>): Promise<EValue> {
  return waitForSomeValue(getFinalValue$(fragment));
}
