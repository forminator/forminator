import { ReadonlyWire } from '@forminator/react-wire';
import { Option } from '../utils/option';

export interface StateDefinition<State, Fns, Args extends any[]> {
  state: State;
  fns: Fns;
  args: Args;
}

export type StateWire<SD extends StateDefinition<any, any, any>> = ReadonlyWire<
  SD['state'],
  SD['fns']
>;

export interface StateComposer<SD extends StateDefinition<any, any, any>> {
  compose(state: Option<SD['state']>, states: SD['state'][]): SD['state'];
  create(...args: SD['args']): StateWire<SD>;
  getKey(): string;
}
