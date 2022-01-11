import { Wire } from '@forminator/react-wire';
import { ForminatorFragment } from '../fragment/forminator-fragment';
import {
  StateComposer,
  StateDefinition,
  StateWire,
} from '../state-composer/state-composer';
import { none, Option, some } from '../utils/option';

export function getState$<
  IValue,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
  ...args: SD['args']
): StateWire<SD> {
  const state$Option = getExistingState$(fragment, stateComposer);
  if (state$Option.isSome()) {
    return state$Option.ok();
  }
  return createAndStoreState$(fragment, stateComposer, ...args);
}

const getWireValue = <Value>(wire: Wire<Value>) => wire.getValue();
export function getExistingState$<
  IValue,
  S extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<S>,
  get = getWireValue,
): Option<StateWire<S>> {
  const key = stateComposer.getKey();
  const stateWires = get(fragment.stateWires$);
  const stateWire = stateWires[key];
  return stateWire ? some(stateWire as StateWire<S>) : none();
}

export function createAndStoreState$<
  IValue,
  SD extends StateDefinition<any, any, any, any>,
>(
  fragment: ForminatorFragment<IValue, any>,
  stateComposer: StateComposer<SD>,
  ...args: SD['args']
): StateWire<SD> {
  const key = stateComposer.getKey();
  const stateWire = stateComposer.create(...args);
  const stateWires = fragment.stateWires$.getValue();
  fragment.stateWires$.setValue({ ...stateWires, [key]: stateWire });
  return stateWire;
}
