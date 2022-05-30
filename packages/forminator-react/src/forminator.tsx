import {
  createFragment,
  ForminatorFragment,
  intoOption,
} from '@forminator/core';
import React, { ReactNode, useMemo, useState } from 'react';
import { ExternalValueContextProvider } from './contexts/external-value-context';
import { FragmentContextProvider } from './contexts/fragment-context';

export interface ForminatorProps<IValue, EValue> {
  externalValue?: EValue;
  rootFragment?: ForminatorFragment<IValue, EValue>;
  children?: ReactNode | undefined;
}

export function Forminator<IValue, EValue>(
  props: ForminatorProps<IValue, EValue>,
) {
  const { externalValue, children } = props;
  const [rootFragment] = useState(
    () => props.rootFragment ?? createFragment<IValue, EValue>(undefined),
  );
  const memoizedExternalValue = useMemo(
    () => intoOption(externalValue),
    [externalValue],
  );
  return (
    <ExternalValueContextProvider value={memoizedExternalValue}>
      <FragmentContextProvider value={rootFragment}>
        {children}
      </FragmentContextProvider>
    </ExternalValueContextProvider>
  );
}
