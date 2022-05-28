import { Forminator, useFragment, useRootFragment, useExternalValue } from '.';

describe('index', function () {
  it('should exports', function () {
    expect(Forminator).toBeDefined();
    expect(useFragment).toBeDefined();
    expect(useRootFragment).toBeDefined();
    expect(useExternalValue).toBeDefined();
  });
});
