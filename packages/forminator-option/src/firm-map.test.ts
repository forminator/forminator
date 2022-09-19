import LeakDetector from 'jest-leak-detector';
import { FirmMap } from './firm-map';

const wrap = (value: any) => ({ value });

describe('firm map', function () {
  it('should keep object until all references are removed', async function () {
    const map = new FirmMap();
    let obj: any = {};
    let wrapped: any = wrap(obj);
    const detector = new LeakDetector(obj);

    expect(await detector.isLeaking()).toBe(true);

    map.set(obj, wrapped);
    expect(map.get(obj)).toBe(wrapped);
    obj = null;

    expect(await detector.isLeaking()).toBe(true);

    wrapped = null;

    expect(await detector.isLeaking()).toBe(false);
  });
  it('should keep wrapped object until all references are removed', async function () {
    const map = new FirmMap();
    let wrapped1: any = wrap(1);
    const detector1 = new LeakDetector(wrapped1);

    const add = (n: any) => {
      map.set(n, wrap(n));
    };
    map.set(1, wrapped1);

    // force garbage collect
    await detector1.isLeaking();
    await detector1.isLeaking();

    add(2);
    add(3);
    add(4);
    add(5);

    expect(map.get(1)).toBe(wrapped1);
    expect(map.has(1)).toBe(true);

    wrapped1 = null;

    // force garbage collect
    await detector1.isLeaking();
    await detector1.isLeaking();

    add(6);
    add(7);
    add(8);
    add(9);

    expect(map.has(1)).toBe(false);
    expect(await detector1.isLeaking()).toBe(false);
  });
  it('should delete item', function () {
    const map = new FirmMap();
    let wrapped1: any = wrap(1);

    map.set(1, wrapped1);
    map.delete(1);
    expect(map.has(1)).toBe(false);

    let obj = {};
    map.set(obj, wrap(obj));
    map.delete(obj);
    expect(map.has(obj)).toBe(false);
  });
  it('should accept initial value', function () {
    const obj = {};
    let wrappedObj: any = wrap(obj);
    let wrapped1: any = wrap(1);

    const map = new FirmMap([
      [obj, wrappedObj],
      [1, wrapped1],
    ]);
    expect(map.get(obj)).toBe(wrappedObj);
    expect(map.get(1)).toBe(wrapped1);
  });
});
