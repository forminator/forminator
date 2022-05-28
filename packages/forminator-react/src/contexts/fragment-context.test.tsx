import { createFragment } from '@forminator/core';
import { renderHook, suppressErrorOutput } from '@forminator/test-render-hook';
import { ReactNode } from 'react';
import {
  FragmentContextProvider,
  useFragmentContext,
} from './fragment-context';

describe('external value context', function () {
  it('should provide external value', function () {
    const fragment = createFragment();
    const wrapper = (props: { children?: ReactNode }) => (
      <FragmentContextProvider value={fragment}>
        {props.children}
      </FragmentContextProvider>
    );
    const { result } = renderHook(
      function () {
        return useFragmentContext();
      },
      { wrapper },
    );
    expect(result.current).toBe(fragment);
  });
  it('should throw error without provider', function () {
    const spy = suppressErrorOutput();
    let { result } = renderHook(function () {
      return useFragmentContext();
    });
    expect(result.error).toBeDefined();
    spy.mockRestore();
  });
});
