import { some } from '../../utils/option';
import { ValueComposer } from '../value-composer/value-composer';
import { ForminatorFragment } from './forminator-fragment';

export function setComposer<IValue, EValue>(
  fragment: ForminatorFragment<IValue, EValue>,
  composer: ValueComposer<IValue, EValue>,
) {
  fragment.composer$.setValue(some(composer));
}
