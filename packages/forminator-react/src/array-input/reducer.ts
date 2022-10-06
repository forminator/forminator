import { ForminatorFragment } from '@forminator/core';
import { Defined } from '@forminator/core';
import { ArrayFragment } from './types';
import * as utils from './value-utils';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';

export interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: {
    index: number;
    fragment: ForminatorFragment<Defined, Defined>;
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

export type ArrayInputActionTypes =
  | AddItemAction
  | RemoveItemAction
  | MoveItemAction;

export function addItem(
  index: number,
  fragment: ForminatorFragment<Defined, Defined>,
): ArrayInputActionTypes {
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

export function arrayInputReducer(
  state: ArrayFragment,
  action: ArrayInputActionTypes,
): ArrayFragment {
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
