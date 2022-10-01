import {
  addItem,
  ArrayInput,
  ArrayOutput,
  DictInput,
  DictInputItem,
  Forminator,
  moveItem,
  removeItem,
  useArrayIndexContext,
  useArrayInputDispatchContext,
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
    expect(useArrayIndexContext).toBeDefined();
    expect(useArrayInputDispatchContext).toBeDefined();
    expect(ArrayInput).toBeDefined();
    expect(ArrayOutput).toBeDefined();
    expect(addItem).toBeDefined();
    expect(removeItem).toBeDefined();
    expect(moveItem).toBeDefined();
  });
});
