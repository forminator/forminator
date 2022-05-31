import { getFinalValue } from '@forminator/core';
import { renderHook } from '@forminator/test-render-hook';
import { ReactNode } from 'react';
import { getInputValueComposer } from './input/use-input-value';
import { Forminator } from './forminator';
import { useComposer } from './use-composer';
import { useFragment } from './use-fragment';

describe('use composer', function () {
  describe('fragment without use composer', function () {
    it('should have none composer', function () {
      const wrapper = (props: { children?: ReactNode }) => {
        return <Forminator>{props.children}</Forminator>;
      };
      const { result } = renderHook(
        () => {
          const fragment = useFragment();
          return { fragment };
        },
        { wrapper },
      );
      const fragment = result.current.fragment!;
      expect(fragment.composer$.getValue().isNone()).toBe(true);
      fragment.value$.setValue(5);
      expect(getFinalValue(fragment).isNone()).toBe(true);
    });
  });
  it('should set composer to fragment', function () {
    const wrapper = (props: { children?: ReactNode }) => {
      return <Forminator>{props.children}</Forminator>;
    };
    const { result } = renderHook(
      () => {
        useComposer(getInputValueComposer());
        const fragment = useFragment();
        return { fragment };
      },
      { wrapper },
    );
    const composer = result.current.fragment.composer$.getValue().ok();
    expect(composer).toBeDefined();
  });
  it('should make fragment usable', function () {
    const wrapper = (props: { children?: ReactNode }) => {
      return <Forminator>{props.children}</Forminator>;
    };
    const { result } = renderHook(
      () => {
        useComposer(getInputValueComposer());
        const fragment = useFragment();
        return { fragment };
      },
      { wrapper },
    );
    const fragment = result.current.fragment!;
    fragment.value$.setValue(5);
    const finalValue = getFinalValue(fragment).ok();
    expect(finalValue).toBe(5);
  });
});
