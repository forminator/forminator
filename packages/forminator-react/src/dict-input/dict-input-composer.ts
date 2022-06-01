import { map, merge, set } from 'lodash';
import { ForminatorFragment, ValueComposer } from '@forminator/core';
import { Dict } from './types';

export function createDictInputValueComposer(): ValueComposer<Dict, object> {
  return {
    compose(value: Dict, { get }) {
      let obj = {};

      map(value, (fragment: ForminatorFragment<unknown, unknown>, key: string) => {
        const itemValue = get(fragment);
        if (key.startsWith('.')) {
          obj = merge(obj, itemValue);
        } else {
          obj = merge(obj, set({}, key.split('.'), itemValue));
        }
      });

      return obj;
      },
    /* istanbul ignore next */
    getFragments(value) {
      return Object.values(value);
    },
  };
}
export const dictInputComposer: ValueComposer<Dict, object> = createDictInputValueComposer();