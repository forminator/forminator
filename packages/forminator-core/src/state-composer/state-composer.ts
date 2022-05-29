import { ReadonlyWire } from '@forminator/react-wire';
import { Option } from '@forminator/option';

export interface StateDefinition<FinalState, State, Fns, Args extends any[]> {
  finalState: FinalState;
  state: State;
  fns: Fns;
  args: Args;
}

export type StateWire<SD extends StateDefinition<any, any, any, any>> =
  ReadonlyWire<SD['state'], SD['fns']>;

export interface StateComposer<SD extends StateDefinition<any, any, any, any>> {
  compose(
    state: Option<SD['state']>,
    states: SD['finalState'][],
  ): SD['finalState'];
  create(...args: SD['args']): StateWire<SD>;
  getKey(): string;
}
