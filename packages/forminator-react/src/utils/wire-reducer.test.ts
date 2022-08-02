import { useWire } from '@forminator/react-wire';
import { renderHook } from '@forminator/test-render-hook';
import { useWireReducer } from './wire-reducer';

describe('use wire reducer', function () {
  it('should work', function () {
    const reducer = (prevState: { value: number }, action: number) => {
      return { value: prevState.value + action };
    };
    const { result } = renderHook(() => {
      const value$ = useWire(null, { value: 0 });
      const dispatch = useWireReducer(reducer, value$);
      return { dispatch, value$ };
    });
    const { value$ } = result.current;
    expect(value$.getValue()).toEqual({ value: 0 });
    result.current.dispatch(1);
    expect(value$.getValue()).toEqual({ value: 1 });
  });
});
