import { createFragment, getFinalValue } from '@forminator/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { StrictMode } from 'react';
import { Forminator } from '../forminator';
import { StringInput } from '../input/use-input-value.test';
import { DictInput } from './dict-input';
import { DictInputItem } from './dict-input-item';

describe('dict input change value', function () {
  it('should update final value when input value changed', async function () {
    const user = userEvent.setup();
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={'fieldA'}>
              <StringInput data-testid="input" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );

    await user.type(screen.getByTestId('input'), 'new value');
    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: 'new value' });
    expect(screen.getByTestId('input')).toHaveValue('new value');
  });
  it('should update final value when input value changed with multiple input', async function () {
    const user = userEvent.setup();
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={'fieldA'}>
              <StringInput data-testid="input-a" />
            </DictInputItem>
            <DictInputItem field={'fieldB'}>
              <StringInput data-testid="input-b" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    await user.type(screen.getByTestId('input-a'), 'new value');
    expect(getFinalValue(rootFragment)).toEqualSome({
      fieldA: 'new value',
      fieldB: '',
    });
    expect(screen.getByTestId('input-a')).toHaveValue('new value');
    expect(screen.getByTestId('input-b')).toHaveValue('');
  });
  it('should update final value when input value changed with multiple input with the same field', async function () {
    const user = userEvent.setup();
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={'fieldA'}>
              <StringInput data-testid="input-a" />
            </DictInputItem>
            <DictInputItem field={'fieldA'}>
              <StringInput data-testid="input-b" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    await user.type(screen.getByTestId('input-a'), 'new value');
    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: 'new value' });
    expect(screen.getByTestId('input-a')).toHaveValue('new value');
    expect(screen.getByTestId('input-b')).toHaveValue('new value');
  });
  it('should update final value input value changed in nested fields', async function () {
    const user = userEvent.setup();
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={'fieldA'}>
              <StringInput data-testid="input-a" />
            </DictInputItem>
            <DictInputItem field={'fieldB'}>
              <DictInput>
                <DictInputItem field={'fieldC'}>
                  <StringInput data-testid="input-bc" />
                </DictInputItem>
              </DictInput>
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    await user.type(screen.getByTestId('input-bc'), 'new value');
    expect(getFinalValue(rootFragment)).toEqualSome({
      fieldA: '',
      fieldB: { fieldC: 'new value' },
    });
    expect(screen.getByTestId('input-a')).toHaveValue('');
    expect(screen.getByTestId('input-bc')).toHaveValue('new value');
  });
  it('should update final value input value changed in shallow fields', async function () {
    const user = userEvent.setup();
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={'fieldA'}>
              <StringInput data-testid="input-a" />
            </DictInputItem>
            <DictInputItem field={'.part1'}>
              <DictInput>
                <DictInputItem field={'fieldB'}>
                  <StringInput data-testid="input-b" />
                </DictInputItem>
              </DictInput>
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    await user.type(screen.getByTestId('input-b'), 'new value');
    expect(getFinalValue(rootFragment)).toEqualSome({
      fieldA: '',
      fieldB: 'new value',
    });
    expect(screen.getByTestId('input-a')).toHaveValue('');
    expect(screen.getByTestId('input-b')).toHaveValue('new value');
  });
});
