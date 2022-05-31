/// <reference types="jest" />

import { act } from '@testing-library/react';
import { ComponentType } from 'react';

export { act };

export declare function renderHook<Result>(
  renderCallback: () => Result,
  options?: RenderHookOptionsWithoutProps,
): RenderHookResultWithoutProps<Result>;

export declare function renderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options: RenderHookOptions<Props>,
): RenderHookResult<Result, Props>;

export declare interface RenderHookOptions<Props> {
  initialProps: Props;
  wrapper?: ComponentType;
  strict?: boolean;
}

export declare interface RenderHookOptionsWithoutProps {
  wrapper?: ComponentType;
  strict?: boolean;
}

export declare interface RenderHookResult<Result, Props> {
  rerender: (props: Props) => void;
  result: ResultRef<Result>;
  unmount: () => void;
}

export declare interface RenderHookResultWithoutProps<Result> {
  rerender: () => void;
  result: ResultRef<Result>;
  unmount: () => void;
}

export declare interface ResultRef<Result> {
  /**
   * it can be undefined if the render callback throws an error
   */
  current: Result;
  error?: Error;
}

export declare function suppressErrorOutput(): jest.SpyInstance<
  void,
  [message?: any, ...optionalParams: any[]]
>;

export {};
