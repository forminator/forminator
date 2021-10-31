import { renderHook } from '@testing-library/react-hooks';
import { silenceConsoleError } from '../test-utils/mock-console-error';
import { useFragment } from './use-fragment';

describe('use fragment', () => {
  it('should throw error when rendered outside of forminator', () => {
    silenceConsoleError();
    const { result } = renderHook(() => {
      useFragment();
    });
    expect(result.error?.message).toBe(
      'useFragmentContext must be used inside the <FragmentContextProvider/>',
    );
  });
});
