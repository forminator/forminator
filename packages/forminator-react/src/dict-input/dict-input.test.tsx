import { createFragment, getFinalValue } from '@forminator/core';
import { render, screen } from '@testing-library/react';
import { Forminator } from '../forminator';
import { StringInput } from '../input/use-input-value.test';
import { DictInput } from './dict-input';
import { DictInputItem } from './dict-input-item';

describe('dict input', function () {
  it('should have empty object when no field is presented', function () {
    const rootFragment = createFragment();
    render(
      <Forminator rootFragment={rootFragment}>
        <DictInput />
      </Forminator>,
    );
    expect(rootFragment.value$.getValue()).toEqual({});
    expect(getFinalValue(rootFragment)).toEqualSome({});
  });

  it('should have field with default value', function () {
    const rootFragment = createFragment();
    render(
      <Forminator rootFragment={rootFragment}>
        <DictInput>
          <DictInputItem field={'value'}>
            <StringInput data-testid="input" />
          </DictInputItem>
        </DictInput>
      </Forminator>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({ value: '' });
    expect(screen.getByTestId('input')).toHaveValue('');
  });
});
