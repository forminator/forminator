import { ForminatorFragment } from '@forminator/core';
import { Defined } from '@forminator/core';
import { ArrayFragment } from './types';
import * as utils from './value-utils';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';

export interface AddItemAction<IV extends Defined, EV extends Defined> {
  type: typeof ADD_ITEM;
  payload: {
    index: number;
    fragment: ForminatorFragment<IV, EV>;
  };
}

export interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: {
    index: number;
  };
}
export interface MoveItemAction {
  type: typeof MOVE_ITEM;
  payload: {
    fromIndex: number;
    toIndex: number;
  };
}

export type ArrayInputActionTypes<
  IV extends Defined = Defined,
  EV extends Defined = Defined,
> = AddItemAction<IV, EV> | RemoveItemAction | MoveItemAction;

export function addItem<IV extends Defined, EV extends Defined>(
  index: number,
  fragment: ForminatorFragment<IV, EV>,
): ArrayInputActionTypes<IV, EV> {
  return {
    type: ADD_ITEM,
    payload: {
      index,
      fragment,
    },
  };
}
export function removeItem(index: number): ArrayInputActionTypes {
  return {
    type: REMOVE_ITEM,
    payload: {
      index,
    },
  };
}
export function moveItem(
  fromIndex: number,
  toIndex: number,
): ArrayInputActionTypes {
  return {
    type: MOVE_ITEM,
    payload: {
      fromIndex,
      toIndex,
    },
  };
}

export function arrayInputReducer<IV extends Defined, EV extends Defined>(
  state: ArrayFragment<IV, EV>,
  action: ArrayInputActionTypes<IV, EV>,
): ArrayFragment<IV, EV> {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { index, fragment } = action.payload;

      return utils.addItem(state, index, fragment);
    }
    case 'REMOVE_ITEM': {
      const { index } = action.payload;
      return utils.removeItem(state, index);
    }
    case 'MOVE_ITEM': {
      const { fromIndex, toIndex } = action.payload;
      return utils.moveItem(state, fromIndex, toIndex);
    }
  }
}
