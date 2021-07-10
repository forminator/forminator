import { createSelector, ReadonlyWire } from '@forminator/react-wire';
import { ForminatorFragment } from '../fragment/forminator-fragment';
import {
  StateComposer,
  StateDefinition,
} from '../state-composer/state-composer';
import { catchNoneError, Option } from '../../utils/option';
import { getExistingState$ } from './get-state-wire';

type Getters = {
  getWireValue: <Value>(wire: ReadonlyWire<Value>) => Value;
  getFragmentState: <IValue, SD extends StateDefinition<any, any, any>>(
    fragment: ForminatorFragment<IValue, any>,
  ) => Option<SD['state']>;
};

export function _getFinalState<
  IValue,
  SD extends StateDefinition<any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
  { getWireValue, getFragmentState }: Getters,
): Option<SD['state']> {
  return catchNoneError(() => {
    const fragmentComposer = getWireValue(fragment.composer$).ok();
    const value = getWireValue(fragment.value$).ok();
    const fragments = fragmentComposer.getFragments(value);
    const state = getExistingState$(fragment, stateComposer, getWireValue).map(
      (stateWire) => getWireValue(stateWire),
    );
    const states = fragments.map((f) => getFragmentState(f).ok());
    return stateComposer.compose(state, states);
  });
}

export function getFinalState<
  IValue,
  SD extends StateDefinition<any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
): Option<SD['state']> {
  return _getFinalState(fragment, stateComposer, {
    getWireValue: (wire) => wire.getValue(),
    getFragmentState: (f) => getFinalState(f, stateComposer),
  });
}

function createFinalState$<IValue, SD extends StateDefinition<any, any, any>>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
) {
  return createSelector<Option<SD['state']>>({
    get: ({ get }): Option<SD['state']> => {
      return _getFinalState(fragment, stateComposer, {
        getWireValue: get,
        getFragmentState: (f) => get(getFinalState$(f, stateComposer)),
      });
    },
  });
}

export function getFinalState$<
  IValue,
  SD extends StateDefinition<any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
): ReadonlyWire<Option<SD['state']>> {
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
