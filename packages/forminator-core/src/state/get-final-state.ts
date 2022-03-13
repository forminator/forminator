import { createSelector, ReadonlyWire } from '@forminator/react-wire';
import { ForminatorFragment } from '../fragment/forminator-fragment';
import {
  StateComposer,
  StateDefinition,
} from '../state-composer/state-composer';
import { catchNoneError, intoOption, Option } from '../utils/option';
import { waitForSomeValue } from '../utils/option-wire';
import { getFinalValue, getFinalValue$ } from '../value/get-final-value';
import { getExistingState$ } from './get-state-wire';

type Getters = {
  getWireValue: <Value>(wire: ReadonlyWire<Value>) => Value;
  getFragmentValue: <IValue, EValue>(
    fragment: ForminatorFragment<IValue, EValue>,
  ) => Option<EValue>;
  getFragmentState: <IValue, SD extends StateDefinition<any, any, any, any>>(
    fragment: ForminatorFragment<IValue, any>,
  ) => Option<SD['state']>;
};

export function _getFinalState<
  IValue,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
  { getWireValue, getFragmentValue, getFragmentState }: Getters,
): Option<SD['state']> {
  return catchNoneError(() => {
    const fragmentComposer = getWireValue(fragment.composer$).ok();
    const value = getWireValue(fragment.value$);
    const fragments = fragmentComposer.getFragments(intoOption(value).ok(), {
      get: (f) => getFragmentValue(f).ok(),
      getWireValue,
    });
    const state = getExistingState$(fragment, stateComposer, getWireValue).map(
      (stateWire) => getWireValue(stateWire),
    );
    const states = fragments.map((f) => getFragmentState(f).ok());
    return stateComposer.compose(state, states);
  });
}

export function getFinalState<
  IValue,
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
  IValue,
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
  IValue,
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
  IValue,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
): Promise<SD['finalState']> {
  return waitForSomeValue(getFinalState$(fragment, stateComposer));
}
