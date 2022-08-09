import { createFragment, ForminatorFragment } from '@forminator/core';
import { fromOption, intoOption } from '@forminator/option';
import { useWireValue } from '@forminator/react-wire';
import { ReactNode, useLayoutEffect, useMemo, useState } from 'react';
import { ExternalValueContextProvider } from '../contexts/external-value-context';
import { FragmentContextProvider } from '../contexts/fragment-context';
import { useExternalValue } from '../use-external-value';
import { useFragment } from '../use-fragment';
import { useDictInputDispatchContext } from './DictInputDispatchContext';
import { addField, removeField } from './reducer';
import { Dict } from './types';
import { selectField } from './value-utils';

export interface DictInputItemProps<Value> {
  field: string;
  keep?: boolean;
  defaultInitialValue?: Value;
  children?: ReactNode;
}

export function DictInputItem<Value>(props: DictInputItemProps<Value>) {
  const { field, defaultInitialValue, keep = false } = props;
  const dictFragment = useFragment<Dict, object>();
  const dictExternalValue = useExternalValue<object>();

  const { value$: dictValue$ } = dictFragment;
  const dictValue = useWireValue(dictValue$);
  const dispatch = useDictInputDispatchContext();

  const [lastFragments] = useState<
    Map<string, ForminatorFragment<unknown, unknown>>
  >(() => new Map());

  useLayoutEffect(() => {
    const dictValue = dictValue$.getValue();
    const dictFieldFragment = dictValue?.[field];
    const lastFieldFragment = lastFragments.get(field);

    if (dictFieldFragment && dictFieldFragment !== lastFieldFragment) {
      lastFragments.set(field, dictFieldFragment);
    }

    if (!dictFieldFragment) {
      const newFieldFragment = lastFieldFragment ?? createFragment();
      if (newFieldFragment !== lastFieldFragment) {
        lastFragments.set(field, newFieldFragment);
      }
      dispatch(addField(field, newFieldFragment));
      return () => {
        !keep && dispatch(removeField(field));
      };
    }
  }, [lastFragments, dictValue$, dispatch, field, keep]);

  const fragment = dictValue?.[field];
  const externalValueFromDict = selectField(
    fromOption(dictExternalValue),
    field,
  );
  const externalValue =
    externalValueFromDict !== undefined
      ? externalValueFromDict
      : defaultInitialValue;

  const externalValueOption = useMemo(
    () => intoOption(externalValue),
    [externalValue],
  );

  if (!fragment) {
    return null;
  }

  return (
    <ExternalValueContextProvider value={externalValueOption}>
      <FragmentContextProvider value={fragment}>
        {props.children}
      </FragmentContextProvider>
    </ExternalValueContextProvider>
  );
}
