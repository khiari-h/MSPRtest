import React from 'react';
import { render, screen } from '@testing-library/react';
import NavItem from '../../../components/molecules/NavItem';

describe('NavItem Component', () => {
  const props = {
    label: 'Test Label',
    href: 'https://example.com',
    className: 'custom-class',
  };

  // Test pour vérifier que le label et le lien sont rendus correctement
  test('renders the label and href correctly', () => {
    render(<NavItem {...props} />);
    const linkElement = screen.getByText(/Test Label/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
  });

  // Test pour vérifier que les classes personnalisées sont appliquées correctement
  test('applies custom classes correctly', () => {
    const { container } = render(<NavItem {...props} />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  // Test pour vérifier que les classes de base sont appliquées correctement
  test('applies base classes correctly', () => {
    const { container } = render(<NavItem {...props} />);
    expect(container.firstChild).toHaveClass('text-concert-text hover:text-custom-yellow-500 px-3 py-2 rounded-md text-sm font-bold transform transition duration-500 hover:scale-110');
  });
});
