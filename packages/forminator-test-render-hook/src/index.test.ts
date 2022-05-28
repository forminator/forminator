import { act, renderHook, suppressErrorOutput } from '.';

describe('index', function () {
  it('should exports', function () {
    expect(renderHook).toBeDefined();
    expect(act).toBeDefined();
    expect(suppressErrorOutput).toBeDefined();
  });
});
