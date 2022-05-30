import { createFragment, getFinalValue } from '@forminator/core';
import { useWireValue } from '@forminator/react-wire';
import { renderHook } from '@forminator/test-render-hook';
import { render, screen } from '@testing-library/react';
import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
} from 'react';
import { Forminator } from '../forminator';
import { useFragment } from '../use-fragment';
import { useInputValue$ } from './use-input-value';

export function StringInput(
  props: { defaultValue?: string } & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue'
  >,
) {
  const { defaultValue = '', ...rest } = props;
  const value$ = useInputValue$(defaultValue);
  const value = useWireValue(value$);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      value$.setValue(e.target.value);
    },
    [value$],
  );
  return <input {...rest} value={value} onChange={onChange} />;
}

describe('use input value wire', function () {
  it('should respect external value if presented', function () {
    const wrapper = (props: { children?: ReactNode }) => {
      const { children } = props;
      return <Forminator externalValue={'external'}>{children}</Forminator>;
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
      const { children } = props;
      return <Forminator>{children}</Forminator>;
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
      const { children } = props;
      return <Forminator>{children}</Forminator>;
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
  describe('String input', function () {
    describe('without initial value', function () {
      it('should have empty value', function () {
        const rootFragment = createFragment();
        render(
          <Forminator rootFragment={rootFragment}>
            <StringInput data-testid="input" />
          </Forminator>,
        );
        expect(rootFragment.value$.getValue()).toEqual('');
        expect(getFinalValue(rootFragment).ok()).toEqual('');
        expect(screen.getByTestId('input')).toHaveValue('');
      });
    });
    it('should respect external value', function () {
      const rootFragment = createFragment();
      render(
        <Forminator rootFragment={rootFragment} externalValue="external">
          <StringInput data-testid="input" defaultValue="default value" />
        </Forminator>,
      );
      expect(rootFragment.value$.getValue()).toEqual('external');
      expect(getFinalValue(rootFragment).ok()).toEqual('external');
      expect(screen.getByTestId('input')).toHaveValue('external');
    });
    it('should respect default value if external value not presented', function () {
      const rootFragment = createFragment();
      render(
        <Forminator rootFragment={rootFragment}>
          <StringInput data-testid="input" defaultValue="default value" />
        </Forminator>,
      );
      expect(rootFragment.value$.getValue()).toEqual('default value');
      expect(getFinalValue(rootFragment).ok()).toEqual('default value');
      expect(screen.getByTestId('input')).toHaveValue('default value');
    });
  });
});
