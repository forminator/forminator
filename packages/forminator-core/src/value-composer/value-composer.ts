import { Defined } from '@forminator/option';
import { ReadonlyWire } from '@forminator/react-wire';
import { ForminatorFragment } from '../fragment/forminator-fragment';

export type GetValue = <Value>(
  v: ForminatorFragment<any, Value & Defined> | ReadonlyWire<Value>,
) => Value;

export interface ValueComposer<IValue, EValue> {
  compose(value: IValue, options: { get: GetValue }): EValue;
  getFragments(
    value: IValue,
    options: { get: GetValue },
  ): ForminatorFragment<any, any>[];
}
