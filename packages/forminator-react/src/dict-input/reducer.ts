import { ForminatorFragment } from '@forminator/core';
import { Defined } from '@forminator/core';
import { Dict } from './types';

export const ADD_FIELD = 'ADD_FIELD';
export const REMOVE_FIELD = 'REMOVE_FIELD';

export interface AddFieldAction {
  type: typeof ADD_FIELD;
  payload: {
    field: string;
    fragment: ForminatorFragment<Defined, Defined>;
  };
}

export interface RemoveFieldAction {
  type: typeof REMOVE_FIELD;
  payload: {
    field: string;
  };
}

export type DictInputActionTypes = AddFieldAction | RemoveFieldAction;

export function addField(
  field: string,
  fragment: ForminatorFragment<Defined, Defined>,
): DictInputActionTypes {
  return {
    type: ADD_FIELD,
    payload: {
      field,
      fragment,
    },
  };
}
export function removeField(field: string): DictInputActionTypes {
  return {
    type: REMOVE_FIELD,
    payload: {
      field,
    },
  };
}

export function dictInputReducer(
  state: Dict,
  action: DictInputActionTypes,
): Dict {
  switch (action.type) {
    case 'ADD_FIELD': {
      const { field, fragment } = action.payload;
      if (state[field] === fragment) {
        return state;
      }
      return { ...state, [field]: fragment };
    }
    case 'REMOVE_FIELD': {
      const { field } = action.payload;
      const { [field]: _, ...nextState } = state;
      return nextState;
    }
  }
}
