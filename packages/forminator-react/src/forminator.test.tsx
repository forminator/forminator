import { createFragment } from '@forminator/core';
import { renderHook } from '@forminator/test-render-hook';
import { ReactNode } from 'react';
import { Forminator } from './forminator';
import { useExternalValue } from './use-external-value';
import { useFragment } from './use-fragment';

describe('forminator', function () {
  it('should provide root fragment', function () {
    const wrapper = (props: { children?: ReactNode }) => {
      return <Forminator>{props.children}</Forminator>;
    };
    const { result } = renderHook(
      () => {
        const rootFragment = useFragment();
        return { rootFragment };
      },
      { wrapper },
    );
    expect(result.current.rootFragment).toBeDefined();
    expect(result.current.rootFragment.value$.getValue()).toBeUndefined();
  });
  it('should provide external value', function () {
    const wrapper = (props: { children?: ReactNode }) => {
      return (
        <Forminator externalValue={'external'}>{props.children}</Forminator>
      );
    };
    const { result } = renderHook(
      () => {
        const externalValue = useExternalValue();
        return { externalValue };
      },
      { wrapper },
    );
    expect(result.current.externalValue).toBeSome('external');
  });
  it('should provide root fragment from prop', function () {
    const rootFragment = createFragment();
    const wrapper = (props: { children?: ReactNode }) => {
      return (
        <Forminator rootFragment={rootFragment}>{props.children}</Forminator>
      );
    };
    const { result } = renderHook(
      () => {
        const rootFragment = useFragment();
        return { rootFragment };
      },
      { wrapper },
    );
    expect(result.current.rootFragment).toBe(rootFragment);
  });
  it('should provide same external value if external value props not changed', function () {
    const wrapper = (props: { children?: ReactNode }) => {
      return (
        <Forminator externalValue={'external'}>{props.children}</Forminator>
      );
    };
    const { result, rerender } = renderHook(
      () => {
        const externalValue = useExternalValue();
        return { externalValue };
      },
      { wrapper },
    );
    const firstExternalValue = result.current.externalValue;
    rerender();
    expect(result.current.externalValue).toBe(firstExternalValue);
  });
});
