import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { silenceConsoleError } from '../test-utils/mock-console-error';
import { Forminator } from './forminator';
import { useExternalValue } from './use-external-value';

describe('use external value', () => {
  describe('without value', () => {
    it('should return undefined when default value is not passed', () => {
      const { result } = renderHook(
        () => {
          const value = useExternalValue();
          return { value };
        },
        { wrapper: (props) => <Forminator>{props.children}</Forminator> },
      );
      expect(result.current.value).toBeUndefined();
    });
    it('should return default value when passed', () => {
      const { result } = renderHook(
        () => {
          const value = useExternalValue(5);
          return { value };
        },
        { wrapper: (props) => <Forminator>{props.children}</Forminator> },
      );
      expect(result.current.value).toBe(5);
    });
  });

  describe('with value', () => {
    it('should return value when default value is not passed', () => {
      const { result } = renderHook(
        () => {
          const value = useExternalValue();
          return { value };
        },
        {
          wrapper: (props) => (
            <Forminator externalValue={8}>{props.children}</Forminator>
          ),
        },
      );
      expect(result.current.value).toBe(8);
    });
    it('should return value when default value passed', () => {
      const { result } = renderHook(
        () => {
          const value = useExternalValue(5);
          return { value };
        },
        {
          wrapper: (props) => (
            <Forminator externalValue={8}>{props.children}</Forminator>
          ),
        },
      );
      expect(result.current.value).toBe(8);
    });
  });

  it('should throw error when rendered outside of forminator', () => {
    silenceConsoleError();
    const { result } = renderHook(() => {
      useExternalValue();
    });
    expect(result.error?.message).toBe(
      'useExternalValueContext must be used inside the <ExternalValueContextProvider/>',
    );
  });
});
