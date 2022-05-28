import { renderHook } from '@forminator/test-render-hook';
import { useRootFragment } from './use-root-fragment';

describe('use root fragment', function () {
  it('should returns a fragment', function () {
    const { result } = renderHook(() => {
      const fragment = useRootFragment();
      return { fragment };
    });
    expect(result.current?.fragment).toBeDefined();
  });
  it('should returns the same fragment after rerender', function () {
    const { result, rerender } = renderHook(() => {
      const fragment = useRootFragment();
      return { fragment };
    });
    const firstFragment = result.current?.fragment;
    rerender();
    expect(result.current?.fragment).toBe(firstFragment);
  });
});
