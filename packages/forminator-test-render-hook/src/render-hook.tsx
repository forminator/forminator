// source: https://github.com/testing-library/react-testing-library/blob/887d95b84ddbcedb46932bf52fbda4518abb35c8/src/pure.js#L118
import { act, render as baseRender } from '@testing-library/react';
import React, {
  ComponentType,
  Fragment,
  StrictMode,
  useContext,
  useEffect,
} from 'react';
import { ErrorBoundary, ErrorContext, ResetContext } from './error-boundary';

export interface ResultRef<Result> {
  /**
   * it can be undefined if the render callback throws an error
   */
  current: Result;
  error?: Error;
}

export interface RenderHookResult<Result, Props> {
  rerender: (props: Props) => void;
  result: ResultRef<Result>;
  unmount: () => void;
}

export interface RenderHookOptions<Props> {
  initialProps: Props;
  wrapper?: ComponentType;
  strict?: boolean;
}

export interface RenderHookResultWithoutProps<Result> {
  rerender: () => void;
  result: ResultRef<Result>;
  unmount: () => void;
}

export interface RenderHookOptionsWithoutProps {
  wrapper?: ComponentType;
  strict?: boolean;
}

export function renderHook<Result>(
  renderCallback: () => Result,
  options?: RenderHookOptionsWithoutProps,
): RenderHookResultWithoutProps<Result>;
export function renderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options: RenderHookOptions<Props>,
): RenderHookResult<Result, Props>;
export function renderHook<Result, Props>(
  renderCallback: (props?: Props) => Result,
  options: Partial<RenderHookOptions<Props>> = {},
): RenderHookResult<Result, Props> | RenderHookResultWithoutProps<Result> {
  const { initialProps, wrapper: Wrapper = Fragment, strict = true } = options;
  const Strict = strict ? StrictMode : Fragment;
  const result: ResultRef<Result> = { current: undefined!, error: undefined };

  function TestComponent({
    renderCallbackProps,
  }: {
    renderCallbackProps?: Props;
  }) {
    const pendingResult = renderCallback(renderCallbackProps);

    useEffect(() => {
      result.current = pendingResult;
      result.error = undefined;
    });

    return null;
  }

  let resetErrorBoundary = () => {};

  function ErrorFallback() {
    const reset = useContext(ResetContext);
    const error = useContext(ErrorContext);
    useEffect(() => {
      resetErrorBoundary = () => {
        resetErrorBoundary = () => {};
        reset?.();
      };
      result.current = undefined!;
      result.error = error;
    }, [error, reset]);
    return null;
  }

  const render = (props?: Props) => {
    resetErrorBoundary();
    return (
      <Strict>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Wrapper>
            <TestComponent renderCallbackProps={props} />
          </Wrapper>
        </ErrorBoundary>
      </Strict>
    );
  };

  const { rerender: baseRerender, unmount } = baseRender(render(initialProps));

  function rerender(rerenderCallbackProps?: Props) {
    return baseRerender(render(rerenderCallbackProps));
  }

  return { result, rerender, unmount };
}

export { act };
