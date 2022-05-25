import { render } from '@testing-library/react';
import { ForminatorTestRenderHook } from './ForminatorTestRenderHook';

describe('ForminatorTestRenderHook', () => {
  it('renders correctly', () => {
    const { container } = render(<ForminatorTestRenderHook />);
    expect(container.textContent).toBe('forminator-test-render-hook');
  });
});
