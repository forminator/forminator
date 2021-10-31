import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { createFragment } from '../../core/fragment/create-fragment';
import { getFinalValue } from '../../core/value/get-final-value';
import { Forminator } from '../../react/forminator';
import { useFragment } from '../../react/use-fragment';
import { useSingleInputWire } from './use-single-input-wire';

describe('use input wire', () => {
  describe('without external initial value', () => {
    it('should have default value', () => {
      const rootFragment = createFragment();
      const { result } = renderHook(
        () => {
          const value$ = useSingleInputWire('');
          return { value$ };
        },
        {
          wrapper: (props) => (
            <Forminator rootFragment={rootFragment}>
              {props.children}
            </Forminator>
          ),
        },
      );
      expect(result.current.value$.getValue()).toBe('');
      expect(getFinalValue(rootFragment).ok()).toBe('');
    });
  });

  describe('with fragment initial value', () => {
    it('should respect external value', () => {
      const rootFragment = createFragment('hello');
      const { result } = renderHook(
        () => {
          const value$ = useSingleInputWire('');
          return { value$ };
        },
        {
          wrapper: (props) => (
            <Forminator rootFragment={rootFragment}>
              {props.children}
            </Forminator>
          ),
        },
      );
      expect(result.current.value$.getValue()).toBe('hello');
      expect(getFinalValue(rootFragment).ok()).toBe('hello');
    });
  });

  describe('with external initial value', () => {
    it('should respect external value', () => {
      const { result } = renderHook(
        () => {
          const fragment = useFragment();
          const value$ = useSingleInputWire('');
          return { fragment, value$ };
        },
        {
          wrapper: (props) => (
            <Forminator externalValue="world">{props.children}</Forminator>
          ),
        },
      );
      expect(result.current.value$.getValue()).toBe('world');
      expect(getFinalValue(result.current.fragment).ok()).toBe('world');
    });
  });
});
