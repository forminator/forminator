import {
  DictInput,
  DictInputItem,
  Forminator,
  useComposer,
  useExternalValue,
  useFragment,
  useInputValue$,
  useRootFragment,
} from '.';

describe('index', function () {
  it('should exports', function () {
    expect(Forminator).toBeDefined();
    expect(useFragment).toBeDefined();
    expect(useRootFragment).toBeDefined();
    expect(useExternalValue).toBeDefined();
    expect(useComposer).toBeDefined();
    expect(useInputValue$).toBeDefined();
    expect(DictInput).toBeDefined();
    expect(DictInputItem).toBeDefined();
  });
});
