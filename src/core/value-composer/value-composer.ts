import { ForminatorFragment } from '../fragment/forminator-fragment';

export type GetFragmentValue = <IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
) => EValue;

export interface ValueComposer<IValue, EValue> {
  compose(value: IValue, options: { get: GetFragmentValue }): EValue;
  getFragments(value: IValue): ForminatorFragment<unknown, any>[];
}
