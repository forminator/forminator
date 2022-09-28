/* fragment */
export type { ForminatorFragment } from './fragment/forminator-fragment';
export { isForminatorFragment } from './fragment/forminator-fragment';
export { createFragment } from './fragment/create-fragment';

/* value */
export type { ValueComposer, GetValue } from './value-composer/value-composer';

export { setComposer } from './fragment/set-composer';
export {
  getFinalValue,
  getFinalValue$,
  waitForFinalValue,
} from './value/get-final-value';

/* state */
export type {
  StateComposer,
  StateDefinition,
  StateWire,
} from './state-composer/state-composer';

export {
  getFinalState,
  getFinalState$,
  waitForFinalState,
} from './state/get-final-state';
export { getState$ } from './state/get-state-wire';

/* utils */
export { createId } from './utils/id';

export {
  some,
  none,
  intoOption,
  fromOption,
  isOption,
} from '@forminator/option';
export type { Option, OptionFns, Some, None } from '@forminator/option';
export { waitForSomeValue } from './utils/option-wire';
export type { ValueSelector } from './value_selector/value-selector';
export { createSelectedFragment } from './external-value/create-selected-fragment';
