import { none, Option, some } from '@forminator/option';
import { createWire } from '@forminator/react-wire';
import { createFragment } from '../fragment/create-fragment';
import { createSelectedFragment } from './create-selected-fragment';

describe('create selected fragment', function () {
  describe('initial value', function () {
    it('should have none initial value when parent has none initial value', function () {
      const fragment = createFragment<any, { x: number }>();
      const xFragment = createSelectedFragment(
        fragment,
        createWire((v: { x: number }) => v.x),
      );
      expect(xFragment.initialValue).toBeNone();
    });
    it('should have some initial value when parent has some initial value', function () {
      const fragment = createFragment<any, { x: number }>();
      fragment.initialValue = some({ x: 5 });
      const xFragment = createSelectedFragment(
        fragment,
        createWire((v: { x: number }) => v.x),
      );
      expect(xFragment.initialValue).toBeSome(5);
    });
    it('should have none initial value when initial value is undefined', function () {
      const fragment = createFragment<any, { x?: number; y?: number }>();
      fragment.initialValue = some({ y: 5 });
      const xFragment = createSelectedFragment(
        fragment,
        createWire((v: { x?: number; y?: number }) => v.x),
      );
      expect(xFragment.initialValue).toBeNone();
    });
  });
  describe('external value', function () {
    it('should have none external value when parent doesnt have external value', function () {
      const fragment = createFragment<any, { x: number }>();
      const xFragment = createSelectedFragment(
        fragment,
        createWire((v: { x: number }) => v.x),
      );
      expect(
        xFragment.externalValue$$.getValue().unwrap().getValue(),
      ).toBeNone();
    });
    it('should have none external value when parent have external value of none', function () {
      const fragment = createFragment<any, { x: number }>();
      fragment.externalValue$$.setValue(
        some(createWire<Option<{ x: number }>>(none())),
      );
      const xFragment = createSelectedFragment(
        fragment,
        createWire((v: { x: number }) => v.x),
      );
      expect(
        xFragment.externalValue$$.getValue().unwrap().getValue(),
      ).toBeNone();
    });
    it('should have some external value when parent have external value of some', function () {
      const fragment = createFragment<any, { x: number }>();
      fragment.externalValue$$.setValue(
        some(createWire<Option<{ x: number }>>(some({ x: 5 }))),
      );
      const xFragment = createSelectedFragment(
        fragment,
        createWire((v: { x: number }) => v.x),
      );
      expect(xFragment.externalValue$$.getValue().unwrap().getValue()).toBeSome(
        5,
      );
    });

    it('should have none external value when external value is undefined', function () {
      const fragment = createFragment<any, { x?: number; y?: number }>();
      fragment.externalValue$$.setValue(
        some(createWire<Option<{ x?: number; y?: number }>>(some({ y: 5 }))),
      );
      const xFragment = createSelectedFragment(
        fragment,
        createWire((v: { x?: number; y?: number }) => v.x),
      );
      expect(xFragment.initialValue).toBeNone();
    });
    it('should have updated external value when parent external value is changed', function () {
      const externalValue$ = createWire<Option<{ x: number }>>(some({ x: 5 }));
      const fragment = createFragment<any, { x: number }>();
      fragment.externalValue$$.setValue(some(externalValue$));
      const xFragment = createSelectedFragment(
        fragment,
        createWire((v: { x: number }) => v.x),
      );
      externalValue$.setValue(some({ x: 4 }));
      expect(xFragment.externalValue$$.getValue().unwrap().getValue()).toBeSome(
        4,
      );
    });
  });
});
