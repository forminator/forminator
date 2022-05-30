import {
  catchNoneError,
  fromOption,
  intoOption,
  isNoneError,
  isOption,
  none,
  NoneError,
  some,
  throwNoneError,
} from '.';

describe('index', function () {
  it('should exports', function () {
    expect(some).toBeDefined();
    expect(none).toBeDefined();
    expect(isOption).toBeDefined();

    expect(intoOption).toBeDefined();
    expect(fromOption).toBeDefined();

    expect(catchNoneError).toBeDefined();
    expect(throwNoneError).toBeDefined();
    expect(isNoneError).toBeDefined();
    expect(NoneError).toBeDefined();
  });
});
