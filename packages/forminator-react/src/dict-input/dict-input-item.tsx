import { createFragment, ForminatorFragment } from '@forminator/core';
import { Defined, intoOption } from '@forminator/core';
import { useWireValue } from '@forminator/react-wire';
import { ReactNode, useLayoutEffect, useState } from 'react';
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

  const dictValue = useWireValue(dictFragment.value$);
  const dispatch = useDictInputDispatchContext();

  const [lastFragments] = useState<
    Map<string, ForminatorFragment<Defined, Defined>>
  >(() => new Map());

  useLayoutEffect(() => {
    const dictValue = dictFragment.value$.getValue();
    const dictFieldFragment = dictValue?.[field];
    const lastFieldFragment = lastFragments.get(field);

    if (dictFieldFragment && dictFieldFragment !== lastFieldFragment) {
      lastFragments.set(field, dictFieldFragment);
    }

    if (!dictFieldFragment) {
      const newFieldFragment =
        lastFieldFragment ??
        createFragment(
          dictFragment.initialValue
            .map((value) => selectField(value, field))
            .or(intoOption(defaultInitialValue)),
        );
      if (newFieldFragment !== lastFieldFragment) {
        lastFragments.set(field, newFieldFragment);
      }
      dispatch(addField(field, newFieldFragment));
      return () => {
        !keep && dispatch(removeField(field));
      };
    }
  }, [lastFragments, dictFragment, dispatch, field, keep, defaultInitialValue]);

  const fragment = dictValue?.[field];
  const externalValueOption = dictExternalValue.map((value) =>
    selectField(value, field),
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
