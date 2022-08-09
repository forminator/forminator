import { forEach, get as path, merge, set } from 'lodash';

export function mergeValues(values: Record<string, unknown>) {
  let obj = {};
  forEach(values, (value, key) => {
    if (key.startsWith('.')) {
      obj = merge(obj, value);
    } else {
      obj = merge(obj, set({}, key.split('.'), value));
    }
  });
  return obj;
}

export const selectField = (value: any, field: string) => {
  if (field.startsWith('.')) {
    return value;
  }
  return path(value, field.split('.'));
};
