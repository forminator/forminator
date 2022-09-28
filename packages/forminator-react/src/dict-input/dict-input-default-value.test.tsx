import { createFragment, getFinalValue, some } from '@forminator/core';
import { render, screen } from '@testing-library/react';
import React, { StrictMode } from 'react';
import { Forminator } from '../forminator';
import { StringInput } from '../input/use-input-value.test';
import { DictInput } from './dict-input';
import { DictInputItem } from './dict-input-item';

describe('dict input default values', function () {
  test('dict input with no fields should have empty object value', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput />
        </Forminator>
      </StrictMode>,
    );
    expect(rootFragment.value$.getValue()).toEqual({});
    expect(getFinalValue(rootFragment)).toEqualSome({});
  });
  it('should use default input default value when no default value is presented', function () {
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
    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: '' });
    expect(screen.getByTestId('input')).toHaveValue('');
  });
  it('should use default value on input', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={'fieldA'}>
              <StringInput data-testid="input" defaultValue="on input" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: 'on input' });
    expect(screen.getByTestId('input')).toHaveValue('on input');
  });
  it('should use default value on dict input item when presented and ignore input default value', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem
              field={'fieldA'}
              defaultInitialValue="on dict input item"
            >
              <StringInput data-testid="input" defaultValue="on input" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({
      fieldA: 'on dict input item',
    });
    expect(screen.getByTestId('input')).toHaveValue('on dict input item');
  });
  it('should use default value on form when presented and ignore input and dict input item default value', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={{ fieldA: 'on form' }}
        >
          <DictInput>
            <DictInputItem
              field={'fieldA'}
              defaultInitialValue="on dict input item"
            >
              <StringInput data-testid="input" defaultValue="on input" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: 'on form' });
    expect(screen.getByTestId('input')).toHaveValue('on form');
  });
  it('should use default value on fragment initial value when presented and ignore form and input and dict input item default value', function () {
    const rootFragment = createFragment<unknown, { fieldA: string }>();
    rootFragment.initialValue = some({ fieldA: 'on fragment' });
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={{ fieldA: 'on form' }}
        >
          <DictInput>
            <DictInputItem
              field={'fieldA'}
              defaultInitialValue="on dict input item"
            >
              <StringInput data-testid="input" defaultValue="on input" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({ fieldA: 'on fragment' });
    expect(screen.getByTestId('input')).toHaveValue('on fragment');
  });

  it('should use default value on form when presented for deep fields', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={{ a: { b: 'on form' } }}
        >
          <DictInput>
            <DictInputItem
              field={'a.b'}
              defaultInitialValue="on dict input item"
            >
              <StringInput data-testid="input" defaultValue="on input" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({ a: { b: 'on form' } });
    expect(screen.getByTestId('input')).toHaveValue('on form');
  });

  it('should use default value on dict input item when form external value is silent about field', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={{ fieldB: 'on form' }}
        >
          <DictInput>
            <DictInputItem
              field={'fieldA'}
              defaultInitialValue="on dict input item"
            >
              <StringInput data-testid="input" defaultValue="on input" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({
      fieldA: 'on dict input item',
    });
    expect(screen.getByTestId('input')).toHaveValue('on dict input item');
  });
  it('should use default value from dict input item in nested dict input', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field={'fieldA'}>
              <DictInput>
                <DictInputItem
                  field={'fieldB'}
                  defaultInitialValue="on dict input item"
                >
                  <StringInput data-testid="input" defaultValue="on input" />
                </DictInputItem>
              </DictInput>
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({
      fieldA: { fieldB: 'on dict input item' },
    });
    expect(screen.getByTestId('input')).toHaveValue('on dict input item');
  });
  it('should use default value from dict input item in nested dict input when form external value is silent about field', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={{ fieldC: 'on form' }}
        >
          <DictInput>
            <DictInputItem field={'fieldA'}>
              <DictInput>
                <DictInputItem
                  field={'fieldB'}
                  defaultInitialValue="on dict input item"
                >
                  <StringInput data-testid="input" defaultValue="on input" />
                </DictInputItem>
              </DictInput>
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );
    expect(getFinalValue(rootFragment)).toEqualSome({
      fieldA: { fieldB: 'on dict input item' },
    });
    expect(screen.getByTestId('input')).toHaveValue('on dict input item');
  });
  it('should use default value from outer dict input item in nested dict input', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem
              field="a"
              defaultInitialValue={{ b: 'on outer dict input item' }}
            >
              <DictInput>
                <DictInputItem field="b">
                  <StringInput data-testid="input" defaultValue="on input" />
                </DictInputItem>
              </DictInput>
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );

    expect(getFinalValue(rootFragment)).toEqualSome({
      a: { b: 'on outer dict input item' },
    });
    expect(screen.getByTestId('input')).toHaveValue('on outer dict input item');
  });
  it('should use default value form outer dict input in shallow nested dict input', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem
              field=".p"
              defaultInitialValue={{ b: 'on outer dict input item' }}
            >
              <DictInput>
                <DictInputItem field="b">
                  <StringInput data-testid="input" defaultValue="on input" />
                </DictInputItem>
              </DictInput>
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );

    expect(getFinalValue(rootFragment)).toEqualSome({
      b: 'on outer dict input item',
    });
    expect(screen.getByTestId('input')).toHaveValue('on outer dict input item');
  });
  it('should use default value from form in shallow nested dict input', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={{ b: 'on form' }}
        >
          <DictInput>
            <DictInputItem field=".p">
              <DictInput>
                <DictInputItem field="b">
                  <StringInput data-testid="input" defaultValue="on input" />
                </DictInputItem>
              </DictInput>
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );

    expect(getFinalValue(rootFragment)).toEqualSome({
      b: 'on form',
    });
    expect(screen.getByTestId('input')).toHaveValue('on form');
  });
  it('should multiple dict input item with same field should have same value', function () {
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator rootFragment={rootFragment}>
          <DictInput>
            <DictInputItem field="a">
              <StringInput data-testid="input" defaultValue="on input" />
            </DictInputItem>
            <DictInputItem field="a">
              <StringInput data-testid="input2" defaultValue="on input2" />
            </DictInputItem>
          </DictInput>
        </Forminator>
      </StrictMode>,
    );

    expect(getFinalValue(rootFragment)).toEqualSome({
      a: 'on input',
    });
    expect(screen.getByTestId('input')).toHaveValue('on input');
    expect(screen.getByTestId('input2')).toHaveValue('on input');
  });
});
