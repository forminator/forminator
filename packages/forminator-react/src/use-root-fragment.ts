import { createFragment, ForminatorFragment } from '@forminator/core';
import { Defined } from '@forminator/option';
import { useState } from 'react';

export function useRootFragment<
  IValue extends Defined,
  EValue extends Defined,
>(): ForminatorFragment<IValue, EValue> {
  const [fragment] = useState(() => createFragment<IValue, EValue>(undefined));
  return fragment;
}
