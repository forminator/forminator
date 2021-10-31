import React, { PropsWithChildren, useState } from 'react';
import { createFragment } from '../core/fragment/create-fragment';
import { ForminatorFragment } from '../core/fragment/forminator-fragment';
import { intoOption } from '../utils/option';
import { ExternalValueContextProvider } from './external-value-context';
import { FragmentContextProvider } from './fragment-context';

interface ForminatorOwnProps<IValue, EValue> {
  externalValue?: EValue;
  rootFragment?: ForminatorFragment<IValue, EValue>;
}

type ForminatorProps<IValue, EValue> = PropsWithChildren<
  ForminatorOwnProps<IValue, EValue>
>;

export function Forminator<IValue, EValue>(
  props: ForminatorProps<IValue, EValue>,
) {
  const { externalValue, children } = props;
  const [rootFragment] = useState(
    () => props.rootFragment ?? createFragment<IValue, EValue>(),
  );
  return (
    <ExternalValueContextProvider value={intoOption(externalValue)}>
      <FragmentContextProvider value={rootFragment}>
        {children}
      </FragmentContextProvider>
    </ExternalValueContextProvider>
  );
}
