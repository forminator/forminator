import { render } from '@testing-library/react';
import { ForminatorReact } from './ForminatorReact';

describe('ForminatorReact', () => {
  it('renders correctly', () => {
    const { container } = render(<ForminatorReact />);
    expect(container.textContent).toBe('forminator-react');
  });
});
