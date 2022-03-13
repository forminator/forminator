import { ReadonlyWire } from '@forminator/react-wire';
import { ForminatorFragment } from '../fragment/forminator-fragment';

export type Getters = {
  getWireValue: <Value>(wire: ReadonlyWire<Value>) => Value;
  get: <IValue, EValue>(fragment: ForminatorFragment<IValue, EValue>) => EValue;
};

export interface ValueComposer<IValue, EValue> {
  compose(value: IValue, options: Getters): EValue;
  getFragments(
    value: IValue,
    options: Getters,
  ): ForminatorFragment<unknown, any>[];
}
