import { setComposer, ValueComposer } from '@forminator/core';
import { useLayoutEffect } from 'react';
import { useFragment } from './use-fragment';

export function useComposer<IValue, EValue>(
  composer: ValueComposer<IValue, EValue>,
) {
  const fragment = useFragment<IValue, EValue>();
  useLayoutEffect(() => {
    setComposer(fragment, composer);
  }, [fragment, composer]);
}
