import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { createFragment } from '../core/fragment/create-fragment';
import { Forminator } from './forminator';
import { useFragment } from './use-fragment';

describe('Forminator', () => {
  it('should pass root fragment', () => {
    const rootFragment = createFragment();
    const { result } = renderHook(
      () => {
        const fragment = useFragment();
        return { fragment };
      },
      {
        wrapper: (props) => (
          <Forminator rootFragment={rootFragment}>{props.children}</Forminator>
        ),
      },
    );
    expect(result.current.fragment).toBe(rootFragment);
  });
});
