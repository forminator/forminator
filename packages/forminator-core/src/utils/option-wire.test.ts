import { createWire } from '@forminator/react-wire';
import { none, Option, some } from './option';
import { waitForSomeValue } from './option-wire';

describe('waitForSomeValue', () => {
  it('should wait for wire value when initial is none', async () => {
    const wire = createWire<Option<number>>(none());
    const fn = jest.fn();
    const run = async () => fn(await waitForSomeValue(wire));
    const promise = run();
    expect(fn).not.toBeCalled();
    wire.setValue(some(1));
    await promise;
    expect(fn).toBeCalledWith(1);
  });
  it('should resolve when initial is some', async () => {
    const wire = createWire<Option<number>>(some(1));
    const fn = jest.fn();
    const run = async () => fn(await waitForSomeValue(wire));
    await run();
    expect(fn).toBeCalledWith(1);
  });
});
