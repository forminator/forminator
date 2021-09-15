import { useState } from 'react';
import { createFragment } from '../core/fragment/create-fragment';
import { ForminatorFragment } from '../core/fragment/forminator-fragment';
import { none } from '../utils/option';

export function useRootFragment<IValue, EValue>(): ForminatorFragment<
  IValue,
  EValue
> {
  const [fragment] = useState(() => createFragment<IValue, EValue>(none()));
  return fragment;
}
