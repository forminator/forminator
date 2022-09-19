import { ValueComposer } from '@forminator/core';
import { ArrayFragment } from './types';

export function createArrayInputValueComposer(): ValueComposer<
  ArrayFragment,
  object
> {
  return {
    compose(value: ArrayFragment, { get }) {
      return value.map((fragment) => get(fragment));
    },
    /* istanbul ignore next */
    getFragments(value) {
      return value;
    },
  };
}
export const arrayInputComposer: ValueComposer<ArrayFragment, object> =
  createArrayInputValueComposer();
