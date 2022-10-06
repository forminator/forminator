import {
  createFragment,
  ForminatorFragment,
  getFinalValue,
  some,
} from '@forminator/core';
import { Defined } from '@forminator/option';
import { suppressErrorOutput } from '@forminator/test-render-hook';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sortBy } from 'lodash';
import React, { ReactNode, StrictMode } from 'react';
import { Forminator } from '../forminator';
import { StringInput } from '../input/use-input-value.test';
import { useFragment } from '../use-fragment';
import { ArrayInput } from './array-input';
import { ArrayOutput } from './array-output';
import { useArrayIndexContext } from './ArrayIndexContext';
import { useArrayInputDispatchContext } from './ArrayInputDispatchContext';
import { addItem, moveItem, removeItem } from './reducer';

const AddButton = (props: {
  index?: number;
  children?: ReactNode;
  initialValue?: string;
}) => {
  const { index = -1, children } = props;
  const dispatch = useArrayInputDispatchContext();
  const onClick = () => {
    const fragment = createFragment();
    if (props.initialValue !== undefined) {
      fragment.initialValue = some(props.initialValue);
    }
    dispatch(addItem(index, fragment));
  };
  return <button onClick={onClick}>{children}</button>;
};
const RemoveButton = (props: { children?: ReactNode }) => {
  const { children } = props;
  const dispatch = useArrayInputDispatchContext();
  const index = useArrayIndexContext();
  const onClick = () => {
    dispatch(removeItem(index));
  };
  return <button onClick={onClick}>{children}</button>;
};
const MoveToEndButton = (props: { children?: ReactNode }) => {
  const { children } = props;
  const dispatch = useArrayInputDispatchContext();
  const index = useArrayIndexContext();
  const onClick = () => {
    dispatch(moveItem(index, -1));
  };
  return <button onClick={onClick}>{children}</button>;
};
const SortButton = (props: { index?: number; children?: ReactNode }) => {
  const { children } = props;
  const fragment = useFragment<
    Array<ForminatorFragment<string, string>>,
    Defined
  >();
  const onClick = () => {
    const value = fragment.value$.getValue();
    if (value) {
      const sorted = sortBy(value, [(item) => item.value$.getValue()]);
      fragment.value$.setValue(sorted);
    }
  };
  return <button onClick={onClick}>{children}</button>;
};

describe('dict input change value', function () {
  it('should have new value in items', async function () {
    const user = userEvent.setup();
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
    await user.clear(screen.getAllByRole('textbox')[0]);
    await user.type(screen.getAllByRole('textbox')[0], 'new value');
    expect(getFinalValue(rootFragment)).toEqualSome(['new value', 'form 2']);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('new value');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 2');
  });
  it('should add new item', async function () {
    const user = userEvent.setup();
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
            <AddButton>add</AddButton>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    await user.click(screen.getByRole('button', { name: 'add' }));
    expect(getFinalValue(rootFragment)).toEqualSome(['form 1', 'form 2', '']);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('form 1');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 2');
    expect(screen.getAllByRole('textbox')[2]).toHaveValue('');

    await user.type(screen.getAllByRole('textbox')[2], 'new value');

    expect(getFinalValue(rootFragment)).toEqualSome([
      'form 1',
      'form 2',
      'new value',
    ]);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('form 1');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 2');
    expect(screen.getAllByRole('textbox')[2]).toHaveValue('new value');
  });
  it('should add new item with initial value', async function () {
    const user = userEvent.setup();
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
            <AddButton initialValue="from button">add</AddButton>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    await user.click(screen.getByRole('button', { name: 'add' }));
    expect(getFinalValue(rootFragment)).toEqualSome([
      'form 1',
      'form 2',
      'from button',
    ]);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('form 1');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 2');
    expect(screen.getAllByRole('textbox')[2]).toHaveValue('from button');

    await user.clear(screen.getAllByRole('textbox')[2]);
    await user.type(screen.getAllByRole('textbox')[2], 'new value');

    expect(getFinalValue(rootFragment)).toEqualSome([
      'form 1',
      'form 2',
      'new value',
    ]);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('form 1');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 2');
    expect(screen.getAllByRole('textbox')[2]).toHaveValue('new value');
  });

  it('should add new item at the start', async function () {
    const user = userEvent.setup();
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
            <AddButton index={0}>add</AddButton>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    await user.click(screen.getByRole('button', { name: 'add' }));
    expect(getFinalValue(rootFragment)).toEqualSome(['', 'form 1', 'form 2']);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 1');
    expect(screen.getAllByRole('textbox')[2]).toHaveValue('form 2');

    await user.type(screen.getAllByRole('textbox')[0], 'new value');

    expect(getFinalValue(rootFragment)).toEqualSome([
      'new value',
      'form 1',
      'form 2',
    ]);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('new value');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 1');
    expect(screen.getAllByRole('textbox')[2]).toHaveValue('form 2');
  });
  it('should add new item at the start with default value from input', async function () {
    const user = userEvent.setup();
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={['form 1', 'form 2']}
        >
          <ArrayInput>
            <ArrayOutput>
              <StringInput defaultValue="from input" />
            </ArrayOutput>
            <AddButton index={0}>add</AddButton>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    await user.click(screen.getByRole('button', { name: 'add' }));
    expect(getFinalValue(rootFragment)).toEqualSome([
      'from input',
      'form 1',
      'form 2',
    ]);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('from input');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 1');
    expect(screen.getAllByRole('textbox')[2]).toHaveValue('form 2');

    await user.clear(screen.getAllByRole('textbox')[0]);
    await user.type(screen.getAllByRole('textbox')[0], 'new value');

    expect(getFinalValue(rootFragment)).toEqualSome([
      'new value',
      'form 1',
      'form 2',
    ]);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('new value');
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('form 1');
    expect(screen.getAllByRole('textbox')[2]).toHaveValue('form 2');
  });
  it('should remove item', async function () {
    const user = userEvent.setup();
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
              <RemoveButton>remove</RemoveButton>
            </ArrayOutput>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    await user.click(screen.getAllByRole('button', { name: 'remove' })[0]);
    expect(getFinalValue(rootFragment)).toEqualSome(['form 2']);
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('form 2');
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
  });
  it('should move item', async function () {
    const user = userEvent.setup();
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={['form 1', 'form 2', 'form 3']}
        >
          <ArrayInput>
            <ArrayOutput>
              <StringInput />
              <MoveToEndButton>move</MoveToEndButton>
            </ArrayOutput>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    await user.click(screen.getAllByRole('button', { name: 'move' })[0]);
    expect(getFinalValue(rootFragment)).toEqualSome([
      'form 2',
      'form 3',
      'form 1',
    ]);
  });
  it('should sort items', async function () {
    const user = userEvent.setup();
    const rootFragment = createFragment();
    render(
      <StrictMode>
        <Forminator
          rootFragment={rootFragment}
          externalValue={['form 3', 'form 1', 'form 2']}
        >
          <ArrayInput>
            <SortButton>sort</SortButton>
            <ArrayOutput>
              <StringInput />
            </ArrayOutput>
          </ArrayInput>
        </Forminator>
      </StrictMode>,
    );
    await user.click(screen.getAllByRole('button', { name: 'sort' })[0]);
    expect(getFinalValue(rootFragment)).toEqualSome([
      'form 1',
      'form 2',
      'form 3',
    ]);
  });
});

describe('array context', function () {
  describe('index context', function () {
    it('should throw error when used without array output', function () {
      suppressErrorOutput();
      expect(() => {
        render(
          <Forminator>
            <ArrayInput>
              <RemoveButton />
            </ArrayInput>
          </Forminator>,
        );
      }).toThrowError(
        'useArrayIndexContext must be used inside the <ArrayIndexContextProvider/>',
      );
    });
  });
  describe('dispatch context', function () {
    it('should throw error when used without array input', function () {
      suppressErrorOutput();
      expect(() => {
        render(
          <Forminator>
            <AddButton />
          </Forminator>,
        );
      }).toThrowError(
        'useArrayInputDispatchContext must be used inside the <ArrayInputDispatchContextProvider/>',
      );
    });
  });
});
