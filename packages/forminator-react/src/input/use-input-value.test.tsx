import { getFinalValue } from '@forminator/core';
import { renderHook } from '@forminator/test-render-hook';
import { ReactNode } from 'react';
import { Forminator } from '../forminator';
import { useFragment } from '../use-fragment';
import { useInputValue$ } from './use-input-value';

describe('use input value wire', function () {
  it('should respect external value if presented', function () {
    const wrapper = (props: { children?: ReactNode }) => {
      return (
        <Forminator externalValue={'external'}>{props.children}</Forminator>
      );
    };
    const { result } = renderHook(
      () => {
        const fragment = useFragment();
        const value$ = useInputValue$<string>('initial');
        return { value$, fragment };
      },
      { wrapper },
    );
    expect(result.current?.value$.getValue()).toBe('external');
    expect(getFinalValue(result.current?.fragment!).ok()).toBe('external');
  });
  it('should set initial value if external value is not presented', function () {
    const wrapper = (props: { children?: ReactNode }) => {
      return <Forminator>{props.children}</Forminator>;
    };
    const { result } = renderHook(
      () => {
        const fragment = useFragment();
        const value$ = useInputValue$<string>('initial');
        return { value$, fragment };
      },
      { wrapper },
    );
    expect(result.current?.value$.getValue()).toBe('initial');
    expect(getFinalValue(result.current?.fragment!).ok()).toBe('initial');
  });
  it('should return wire with undefined value if initial and external value are not presented', function () {
    const wrapper = (props: { children?: ReactNode }) => {
      return <Forminator>{props.children}</Forminator>;
    };
    const { result } = renderHook(
      () => {
        const fragment = useFragment();
        const value$ = useInputValue$<string>();
        return { value$, fragment };
      },
      { wrapper },
    );
    expect(result.current?.value$.getValue()).toBeUndefined();
    expect(getFinalValue(result.current?.fragment!).isNone()).toBeTruthy();
  });
});
