import { createFragment, getFinalValue } from '@forminator/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { StrictMode } from 'react';
import { Forminator } from '../forminator';
import { StringInput } from '../input/use-input-value.test';
import { DictInput } from './dict-input';
import { DictInputItem } from './dict-input-item';

describe('dict input change field', function () {
  it('should remove value when field is removed', function () {
    const rootFragment = createFragment();
    const Form = (props: { mountB?: boolean }) => (
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={'fieldA'}>
              <StringInput data-testid="input-a" />
            </DictInputItem>
            {props.mountB && (
              <DictInputItem field={'fieldB'}>
                <StringInput data-testid="input-b" />
              </DictInputItem>
            )}
          </DictInput>
        </Forminator>
      </StrictMode>
    );

    const { rerender } = render(<Form mountB />);

    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: '', fieldB: '' });

    rerender(<Form />);

    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: '' });
    expect(screen.getByTestId('input-a')).toHaveValue('');
  });
  it('should keep value when field is removed with keep prop', function () {
    const rootFragment = createFragment();
    const Form = (props: { mountB?: boolean }) => (
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={'fieldA'}>
              <StringInput data-testid="input-a" />
            </DictInputItem>
            {props.mountB && (
              <DictInputItem field={'fieldB'} keep>
                <StringInput data-testid="input-b" />
              </DictInputItem>
            )}
          </DictInput>
        </Forminator>
      </StrictMode>
    );

    const { rerender } = render(<Form mountB />);

    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: '', fieldB: '' });

    rerender(<Form />);

    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: '', fieldB: '' });
    expect(screen.getByTestId('input-a')).toHaveValue('');
  });
  it('should have a new clear field when field changed', async function () {
    const user = userEvent.setup();
    const rootFragment = createFragment();
    const Form = (props: { field: string }) => (
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={props.field}>
              <StringInput data-testid="input" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>
    );
    const { rerender } = render(<Form field="a" />);

    await user.type(screen.getByTestId('input'), 'value a');
    expect(getFinalValue(rootFragment)).toEqualSome({ a: 'value a' });
    expect(screen.getByTestId('input')).toHaveValue('value a');

    rerender(<Form field="b" />);
    expect(getFinalValue(rootFragment)).toEqualSome({ b: '' });
    expect(screen.getByTestId('input')).toHaveValue('');

    rerender(<Form field="a" />);
    expect(getFinalValue(rootFragment)).toEqualSome({ a: 'value a' });
    expect(screen.getByTestId('input')).toHaveValue('value a');
  });
});
