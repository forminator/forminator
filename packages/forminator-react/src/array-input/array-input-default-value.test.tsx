import { createFragment, getFinalValue } from '@forminator/core';
import { render, screen } from '@testing-library/react';
import React, { StrictMode } from 'react';
import { DictInput } from '../dict-input/dict-input';
import { DictInputItem } from '../dict-input/dict-input-item';
import { Forminator } from '../forminator';
import { StringInput } from '../input/use-input-value.test';
import { ArrayInput } from './array-input';
import { ArrayOutput } from './array-output';

describe('dict input default value', function () {
  test('dict input with no nested input should have empty array value', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <ArrayInput />
        </Forminator>
      </StrictMode>,
    );
    expect(rootFragment.value$.getValue()).toEqual([]);
    expect(getFinalValue(rootFragment)).toEqualSome([]);
  });
  it('should use form default value', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={['form 1', 'form 2']}
        >
          <ArrayInput>
            <ArrayOutput>
              <StringInput />
            </ArrayOutput>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome(['form 1', 'form 2']);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('form 1');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 2');
  });
  it('should use input default value if item value is undefined', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={['form 1', undefined]}
        >
          <ArrayInput>
            <ArrayOutput>
              <StringInput data-testid="input" defaultValue="input value" />
            </ArrayOutput>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome(['form 1', 'input value']);
    expect(screen.getAllByTestId('input')[0]).toHaveValue('form 1');
    expect(screen.getAllByTestId('input')[1]).toHaveValue('input value');
  });
  it('should use default default value if item value is undefined', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={['form 1', undefined]}
        >
          <ArrayInput>
            <ArrayOutput>
              <StringInput data-testid="input" />
            </ArrayOutput>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome(['form 1', '']);
    expect(screen.getAllByTestId('input')[0]).toHaveValue('form 1');
    expect(screen.getAllByTestId('input')[1]).toHaveValue('');
  });
  it('should work as nested input and default value from dict input item', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={'fieldA'} defaultInitialValue={['field 1']}>
              <ArrayInput>
                <ArrayOutput>
                  <StringInput data-testid="input" />
                </ArrayOutput>
              </ArrayInput>
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: ['field 1'] });
    expect(screen.getAllByTestId('input')[0]).toHaveValue('field 1');
  });
  it('should work as nested input, and default value from form', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={{ fieldA: ['form 1'] }}
        >
          <DictInput>
            <DictInputItem field={'fieldA'} defaultInitialValue={['field 1']}>
              <ArrayInput>
                <ArrayOutput>
                  <StringInput data-testid="input" />
                </ArrayOutput>
              </ArrayInput>
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: ['form 1'] });
    expect(screen.getAllByTestId('input')[0]).toHaveValue('form 1');
  });
  it('should works with nested dict input without default value', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={[undefined, undefined]}
        >
          <ArrayInput>
            <ArrayOutput>
              <DictInput>
                <DictInputItem field={'x'}>
                  <StringInput />
                </DictInputItem>
              </DictInput>
            </ArrayOutput>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome([{ x: '' }, { x: '' }]);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('');
  });
  it('should works with nested dict input with default value', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={[{ x: 'form 1' }, undefined]}
        >
          <ArrayInput>
            <ArrayOutput>
              <DictInput>
                <DictInputItem field={'x'} defaultInitialValue="field 2">
                  <StringInput />
                </DictInputItem>
              </DictInput>
            </ArrayOutput>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome([
      { x: 'form 1' },
      { x: 'field 2' },
    ]);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('form 1');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('field 2');
  });
  it('should works with nested array input', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={[['form 1.1', 'form 1.2'], ['form 2.1']]}
        >
          <ArrayInput>
            <ArrayOutput>
              <div data-testid="row">
                <ArrayInput>
                  <ArrayOutput>
                    <StringInput />
                  </ArrayOutput>
                </ArrayInput>
              </div>
            </ArrayOutput>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome([
      ['form 1.1', 'form 1.2'],
      ['form 2.1'],
    ]);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('form 1.1');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 1.2');
    expect(screen.getAllByTestId('row')[0]).toContainElement(
      screen.getAllByRole('textbox')[0],
    );
    expect(screen.getAllByTestId('row')[0]).toContainElement(
      screen.getAllByRole('textbox')[1],
    );

    expect(screen.getAllByRole('textbox')[2]).toHaveValue('form 2.1');
    expect(screen.getAllByTestId('row')[1]).toContainElement(
      screen.getAllByRole('textbox')[2],
    );
  });
  it('should show fallback when array is empty', function () {
    render(
      <StrictMode>
        <Forminator externalValue={[]}>
          <ArrayInput>
            <ArrayOutput fallback={<div data-testid="fallback">no item</div>}>
              <StringInput />
            </ArrayOutput>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });
});
