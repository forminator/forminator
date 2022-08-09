import { createFragment } from '@forminator/core';
import { addField, dictInputReducer, removeField } from './reducer';

describe('dict input reducer', function () {
  it('should add field', function () {
    const fragment = createFragment();
    const state = dictInputReducer({}, addField('a', fragment));
    expect(state).toEqual({ a: fragment });
  });
  it('should not change state if fragment is same', function () {
    const fragment = createFragment();
    const state1 = dictInputReducer({}, addField('a', fragment));
    const state2 = dictInputReducer(state1, addField('a', fragment));
    expect(state2).toBe(state1);
  });
  it('should remove field', function () {
    const state = dictInputReducer(
      { a: createFragment(), b: createFragment() },
      removeField('a'),
    );
    expect(state).toHaveProperty('b');
    expect(state).not.toHaveProperty('a');
  });
});
