import { some } from '../utils/option';
import { ValueComposer } from '../value-composer/value-composer';
import { ForminatorFragment } from './forminator-fragment';

export function setComposer<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
  composer: ValueComposer<IValue, EValue>,
) {
  const fragmentComposer = fragment.composer$.getValue();
  if (
    fragmentComposer.isNone() ||
    (fragmentComposer.isSome() && fragmentComposer.ok() !== composer)
  ) {
    fragment.composer$.setValue(some(composer));
  }
}
