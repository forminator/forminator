import { createFragment } from '@forminator/core';
import { Dict } from './types';

export const ADD_FIELD = 'ADD_FIELD';
export const REMOVE_FIELD = 'REMOVE_FIELD';

export interface AddFieldAction {
  type: typeof ADD_FIELD;
  payload: {
    field: string;
    initialValue: unknown;
  };
}

export interface RemoveFieldAction {
  type: typeof REMOVE_FIELD;
  payload: {
    field: string;
  };
}

export type DictInputActionTypes = AddFieldAction | RemoveFieldAction;

export function addField(field: string, initialValue: unknown): DictInputActionTypes {
  return {
    type: ADD_FIELD,
    payload: {
      field,
      initialValue,
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

export function dictInputReducer(state: Dict, action: DictInputActionTypes): Dict {
  switch (action.type) {
    case 'ADD_FIELD': {
      const { field } = action.payload;
      if (state[field]) {
        return state;
      }
      return { ...state, [field]: createFragment() };
    }
    case 'REMOVE_FIELD': {
      const { field } = action.payload;
      const { [field]: _, ...nextState } = state;
      return nextState;
    }
  }
}
