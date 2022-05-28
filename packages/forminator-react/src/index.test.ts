import {
  Forminator,
  useComposer,
  useExternalValue,
  useFragment,
  useRootFragment,
} from '.';

describe('index', function () {
  it('should exports', function () {
    expect(Forminator).toBeDefined();
    expect(useFragment).toBeDefined();
    expect(useRootFragment).toBeDefined();
    expect(useExternalValue).toBeDefined();
    expect(useComposer).toBeDefined();
  });
});
