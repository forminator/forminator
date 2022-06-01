import { intoOption } from '@forminator/option';
import { useWireValue } from '@forminator/react-wire';
import { get as path } from 'lodash';
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react';
import {
  ExternalValueContextProvider,
  useExternalValueContext,
} from '../contexts/external-value-context';
import { FragmentContextProvider } from '../contexts/fragment-context';
import { useExternalValue } from '../use-external-value';
import { useFragment } from '../use-fragment';
import { useDictInputDispatchContext } from './DictInputDispatchContext';
import { addField } from './reducer';
import { Dict } from './types';

interface DictInputItemProps<Value> {
  field: string;
  defaultInitialValue?: Value;
  children?: ReactNode;
}

const selectField = (value: any, field: string) => {
  if (field.startsWith('.')) {
    return value;
  }
  return path(value, field.split('.'));
};

export function DictInputItem<Value>(props: DictInputItemProps<Value>) {
  const { field, defaultInitialValue } = props;
  const dictFragment = useFragment<Dict, object>();
  const dictExternalValue = useExternalValue<object>();

  const { value$: dictValue$ } = dictFragment;
  const dictValue = useWireValue(dictValue$);
  const dispatch = useDictInputDispatchContext();

  useLayoutEffect(() => {
    const dictValue = dictValue$.getValue();
    const fieldFragment = dictValue?.[field];
    if (!fieldFragment) {
      const initialValueFromDict = selectField(dictExternalValue, field);
      const initialValue =
        initialValueFromDict === undefined
          ? defaultInitialValue
          : initialValueFromDict;
      dispatch(addField(field, initialValue));
      return () => {};
    }
  }, [defaultInitialValue, dictExternalValue, dictValue$, dispatch, field]);

  const fragment = dictValue?.[field];

  const externalValue = useMemo(
    () => intoOption(selectField(dictExternalValue, field)),
    [dictExternalValue, field],
  );

  if (!fragment) {
    return null;
  }

  return (
    <ExternalValueContextProvider value={externalValue}>
      <FragmentContextProvider value={fragment}>
        {props.children}
      </FragmentContextProvider>
    </ExternalValueContextProvider>
  );
}
