import { createSelector, ReadonlyWire } from '@forminator/react-wire';
import {
  ForminatorFragment,
  isForminatorFragment,
} from '../fragment/forminator-fragment';
import {
  StateComposer,
  StateDefinition,
} from '../state-composer/state-composer';
import {
  catchNoneError,
  Defined,
  intoOption,
  Option,
} from '@forminator/option';
import { waitForSomeValue } from '../utils/option-wire';
import { getFinalValue, getFinalValue$ } from '../value/get-final-value';
import { getExistingState$ } from './get-state-wire';

type Getters = {
  getWireValue: <Value>(wire: ReadonlyWire<Value>) => Value;
  getFragmentValue: <IValue extends Defined, EValue extends Defined>(
    fragment: ForminatorFragment<IValue, EValue>,
  ) => Option<EValue>;
  getFragmentState: <
    IValue extends Defined,
    SD extends StateDefinition<any, any, any, any>,
  >(
    fragment: ForminatorFragment<IValue, any>,
  ) => Option<SD['state']>;
};

export function _getFinalState<
  IValue extends Defined,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
  { getWireValue, getFragmentValue, getFragmentState }: Getters,
): Option<SD['state']> {
  return catchNoneError(() => {
    const fragmentComposer = getWireValue(fragment.composer$).unwrap();
    const value = getWireValue(fragment.value$);
    const fragments = fragmentComposer.getFragments(
      intoOption(value).unwrap(),
      {
        get: <Value>(
          v: ForminatorFragment<any, Value & Defined> | ReadonlyWire<Value>,
        ): Value => {
          return isForminatorFragment<any, Value & Defined>(v)
            ? getFragmentValue(v).unwrap()
            : getWireValue(v as ReadonlyWire<Value>);
        },
      },
    );
    const state = getExistingState$(fragment, stateComposer, getWireValue).map(
      (stateWire) => getWireValue(stateWire),
    );
    const states = fragments.map((f) => getFragmentState(f).unwrap());
    return stateComposer.compose(state, states);
  });
}

export function getFinalState<
  IValue extends Defined,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
): Option<SD['finalState']> {
  return _getFinalState(fragment, stateComposer, {
    getWireValue: (wire) => wire.getValue(),
    getFragmentValue: getFinalValue,
    getFragmentState: (f) => getFinalState(f, stateComposer),
  });
}

function createFinalState$<
  IValue extends Defined,
  SD extends StateDefinition<any, any, any, any>,
>(fragment: ForminatorFragment<IValue, any>, stateComposer: StateComposer<SD>) {
  return createSelector<Option<SD['finalState']>>({
    get: ({ get }): Option<SD['finalState']> => {
      return _getFinalState(fragment, stateComposer, {
        getWireValue: get,
        getFragmentValue: (f) => get(getFinalValue$(f)),
        getFragmentState: (f) => get(getFinalState$(f, stateComposer)),
      });
    },
  });
}

export function getFinalState$<
  IValue extends Defined,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
): ReadonlyWire<Option<SD['finalState']>> {
  const key = stateComposer.getKey();
  const finalStateWires = fragment.finalStateWires$.getValue();
  const finalStateWire = finalStateWires[key];
  if (finalStateWire) {
    return finalStateWire;
  }

  const finalState$ = createFinalState$(fragment, stateComposer);

  fragment.finalStateWires$.setValue({
    ...finalStateWires,
    [key]: finalState$,
  });
  return finalState$;
}

export function waitForFinalState<
  IValue extends Defined,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
): Promise<SD['finalState']> {
  return waitForSomeValue(getFinalState$(fragment, stateComposer));
}
