import { useWireValue } from '@forminator/react-wire';
import { ReactNode } from 'react';
import { ExternalValueContextProvider } from '../contexts/external-value-context';
import { FragmentContextProvider } from '../contexts/fragment-context';
import { useExternalValue } from '../use-external-value';
import { useFragment } from '../use-fragment';
import { ArrayIndexContextProvider } from './ArrayIndexContext';
import { ArrayFragment } from './types';

export interface ArrayOutputProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

export function ArrayOutput(props: ArrayOutputProps) {
  const arrayFragment = useFragment<ArrayFragment, Array<unknown>>();
  const arrayValue = useWireValue(arrayFragment.value$);
  const arrayExternalValue = useExternalValue<Array<unknown>>();

  if (arrayValue === undefined) {
    return null;
  }

  return (
    <>
      {arrayValue.length > 0 &&
        arrayValue.map((fragment, index) => {
          return (
            <ArrayIndexContextProvider value={index} key={fragment.id}>
              <ExternalValueContextProvider
                value={arrayExternalValue.map((value) => value[index])}
              >
                <FragmentContextProvider value={fragment}>
                  {props.children}
                </FragmentContextProvider>
              </ExternalValueContextProvider>
            </ArrayIndexContextProvider>
          );
        })}
      {arrayValue.length === 0 && props.fallback}
    </>
  );
}
