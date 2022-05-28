import {
  isForminatorFragment,
  createFragment,
  setComposer,
  getFinalValue,
  getFinalValue$,
  waitForFinalValue,
  getFinalState,
  getFinalState$,
  waitForFinalState,
  getState$,
  createId,
  waitForSomeValue,
  some,
  none,
  intoOption,
  fromOption,
} from '.';

describe('index', function () {
  it('should exports', function () {
    expect(isForminatorFragment).toBeDefined();
    expect(createFragment).toBeDefined();
    expect(setComposer).toBeDefined();
    expect(getFinalValue).toBeDefined();
    expect(getFinalValue$).toBeDefined();
    expect(waitForFinalValue).toBeDefined();
    expect(getFinalState).toBeDefined();
    expect(getFinalState$).toBeDefined();
    expect(waitForFinalState).toBeDefined();
    expect(getState$).toBeDefined();
    expect(createId).toBeDefined();
    expect(waitForSomeValue).toBeDefined();
    expect(some).toBeDefined();
    expect(none).toBeDefined();
    expect(intoOption).toBeDefined();
    expect(fromOption).toBeDefined();
  });
});
