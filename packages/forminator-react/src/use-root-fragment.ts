import { createFragment, ForminatorFragment } from '@forminator/core';
import { useState } from 'react';

export function useRootFragment<IValue, EValue>(): ForminatorFragment<
  IValue,
  EValue
> {
  const [fragment] = useState(() => createFragment<IValue, EValue>(undefined));
  return fragment;
}
