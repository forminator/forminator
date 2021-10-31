import { useEffect } from 'react';
import { setComposer } from '../core/fragment/set-composer';
import { ValueComposer } from '../core/value-composer/value-composer';
import { useFragment } from './use-fragment';

export function useComposer<IValue, EValue>(
  composer: ValueComposer<IValue, EValue>,
) {
  const fragment = useFragment<IValue, EValue>();
  useEffect(() => {
    setComposer(fragment, composer);
  }, [fragment, composer]);
}
