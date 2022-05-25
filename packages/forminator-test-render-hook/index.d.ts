import { act } from '@testing-library/react';
import { ComponentType } from 'react';

export { act };

export declare function renderHook<Result, Props>(
  renderCallback: () => Result,
  options?: RenderHookOptionsWithoutProps<Props>,
): RenderHookResultWithoutProps<Result, Props>;

export declare function renderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options: RenderHookOptions<Props>,
): RenderHookResult<Result, Props>;

export declare interface RenderHookOptions<Props> {
  initialProps: Props;
  wrapper?: ComponentType;
  strict?: boolean;
}

export declare interface RenderHookOptionsWithoutProps<Props> {
  wrapper?: ComponentType;
  strict?: boolean;
}

export declare interface RenderHookResult<Result, Props> {
  rerender: (props: Props) => void;
  result: {
    current: Result;
  };
  unmount: () => void;
}

export declare interface RenderHookResultWithoutProps<Result, Props> {
  rerender: () => void;
  result: {
    current: Result;
  };
  unmount: () => void;
}

export {};
