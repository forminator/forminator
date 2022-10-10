import { ForminatorFragment } from '@forminator/core';
import { Defined } from '@forminator/core';

export type ArrayFragment<
  IV extends Defined = Defined,
  EV extends Defined = Defined,
> = Array<ForminatorFragment<IV, EV>>;
