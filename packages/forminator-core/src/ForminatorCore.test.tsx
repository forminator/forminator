import { render } from '@testing-library/react';
import { ForminatorCore } from './ForminatorCore';

describe('ForminatorCore', () => {
  it('renders correctly', () => {
    const { container } = render(<ForminatorCore />);
    expect(container.textContent).toBe('forminator-core');
  });
});
