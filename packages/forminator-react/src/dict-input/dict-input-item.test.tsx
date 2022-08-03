import { suppressErrorOutput } from '@forminator/test-render-hook';
import { render } from '@testing-library/react';
import { Forminator } from '../forminator';
import { StringInput } from '../input/use-input-value.test';
import { DictInputItem } from './dict-input-item';

describe('dict input item', function () {
  it('should throw error when used without dict input', function () {
    suppressErrorOutput();
    expect(() => {
      render(
        <Forminator>
          <DictInputItem field={'fieldA'}>
            <StringInput data-testid="input" />
          </DictInputItem>
        </Forminator>,
      );
    }).toThrowError(
      'useDictInputDispatchContext must be used inside the <DictInputDispatchContextProvider/>',
    );
  });
});
