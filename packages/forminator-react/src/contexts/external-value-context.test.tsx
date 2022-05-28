import { some } from '@forminator/core';
import { renderHook, suppressErrorOutput } from '@forminator/test-render-hook';
import { ReactNode } from 'react';
import {
  ExternalValueContextProvider,
  useExternalValueContext,
} from './external-value-context';

describe('external value context', function () {
  it('should provide external value', function () {
    const wrapper = (props: { children?: ReactNode }) => (
      <ExternalValueContextProvider value={some('foo')}>
        {props.children}
      </ExternalValueContextProvider>
    );
    renderHook(
      function () {
        return useExternalValueContext();
      },
      { wrapper },
    );
  });
  it('should throw error without provider', function () {
    const spy = suppressErrorOutput();
    let { result } = renderHook(function () {
      return useExternalValueContext();
    });
    expect(result.error).toBeDefined();
    spy.mockRestore();
  });
});
