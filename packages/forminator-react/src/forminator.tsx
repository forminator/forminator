import {
  createFragment,
  ForminatorFragment,
  intoOption,
} from '@forminator/core';
import { Defined } from '@forminator/core';
import React, { ReactNode, useState } from 'react';
import { ExternalValueContextProvider } from './contexts/external-value-context';
import { FragmentContextProvider } from './contexts/fragment-context';

export interface ForminatorProps<
  IValue extends Defined,
  EValue extends Defined,
> {
  externalValue?: EValue;
  rootFragment?: ForminatorFragment<IValue, EValue>;
  children?: ReactNode | undefined;
}

function createRootFragment<IValue extends Defined, EValue extends Defined>(
  rootFragment?: ForminatorFragment<IValue, EValue>,
  externalValue?: EValue,
) {
  if (rootFragment) {
    if (rootFragment.initialValue.isNone()) {
      rootFragment.initialValue = intoOption(externalValue);
    }
    return rootFragment;
  }
  const fragment = createFragment<IValue, EValue>(undefined);
  fragment.initialValue = intoOption(externalValue);
  return fragment;
}

export function Forminator<IValue extends Defined, EValue extends Defined>(
  props: ForminatorProps<IValue, EValue>,
) {
  const { externalValue, children } = props;
  const [rootFragment] = useState(() =>
    createRootFragment(props.rootFragment, props.externalValue),
  );
  const externalValueOption = intoOption(externalValue);

  return (
    <ExternalValueContextProvider value={externalValueOption}>
      <FragmentContextProvider value={rootFragment}>
        {children}
      </FragmentContextProvider>
    </ExternalValueContextProvider>
  );
}
