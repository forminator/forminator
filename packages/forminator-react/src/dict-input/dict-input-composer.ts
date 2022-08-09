import { ValueComposer } from '@forminator/core';
import { mapValues } from 'lodash';
import { mergeValues } from './value-utils';
import { Dict } from './types';

export function createDictInputValueComposer(): ValueComposer<Dict, object> {
  return {
    compose(value: Dict, { get }) {
      const values = mapValues(value, (fragment) => get(fragment));
      return mergeValues(values);
    },
    /* istanbul ignore next */
    getFragments(value) {
      return Object.values(value);
    },
  };
}
export const dictInputComposer: ValueComposer<Dict, object> =
  createDictInputValueComposer();
