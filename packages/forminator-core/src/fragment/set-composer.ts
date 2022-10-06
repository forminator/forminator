import { Defined, some } from '@forminator/option';
import { ValueComposer } from '../value-composer/value-composer';
import { ForminatorFragment } from './forminator-fragment';

export function setComposer<IValue extends Defined, EValue extends Defined>(
  fragment: ForminatorFragment<IValue, EValue>,
  composer: ValueComposer<IValue, EValue>,
) {
  const fragmentComposer = fragment.composer$.getValue();
  if (
    fragmentComposer.isNone() ||
    (fragmentComposer.isSome() && fragmentComposer.unwrap() !== composer)
  ) {
    fragment.composer$.setValue(some(composer));
  }
}
