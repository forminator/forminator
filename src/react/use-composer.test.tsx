import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { createFragment } from '../core/fragment/create-fragment';
import { getAtomicValueComposer } from '../core/value-composer/__fixture__/composers';
import { Forminator } from './forminator';
import { useComposer } from './use-composer';

describe('use composer', () => {
  it('should set composer to fragment', () => {
    const rootFragment = createFragment();
    renderHook(
      () => {
        useComposer(getAtomicValueComposer());
      },
      {
        wrapper: (props) => (
          <Forminator rootFragment={rootFragment}>{props.children}</Forminator>
        ),
      },
    );
    expect(rootFragment.composer$.getValue().ok()).toBe(
      getAtomicValueComposer(),
    );
  });
});
