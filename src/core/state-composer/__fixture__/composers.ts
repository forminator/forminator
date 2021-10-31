import { createWire } from '@forminator/react-wire';
import { StateComposer, StateDefinition } from '../state-composer';

type LoadingFns = { loading: () => void; ready: () => void };

/**
 * - true means loading
 * - false means ready
 */
export const loadingStateComposer: StateComposer<
  StateDefinition<boolean, boolean, LoadingFns, [boolean?]>
> = {
  compose(state, states) {
    if (state.or(false)) {
      return true;
    }
    return states.some((loading) => loading);
  },
  create(initial = false) {
    const wire = createWire<boolean, LoadingFns>(initial);
    wire.fn('loading', () => {
      wire.setValue(true);
    });
    wire.fn('ready', () => {
      wire.setValue(false);
    });
    return wire;
  },
  getKey(): string {
    return 'loading';
  },
};
