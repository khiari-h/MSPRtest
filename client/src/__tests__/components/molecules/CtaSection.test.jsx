import React from 'react';
import { render, screen } from '@testing-library/react';
import CTASection from '../../../components/molecules/CtaSection';

describe('CTASection Component', () => {
  const ctas = [
    { label: 'Button 1', href: 'https://example.com/1', className: 'btn-class-1' },
    { label: 'Button 2', href: 'https://example.com/2', className: 'btn-class-2' },
  ];

  // Test pour vérifier que le titre de la section est rendu correctement
  test('renders the title', () => {
    render(<CTASection title="Test Title" ctas={ctas} />);
    const titleElement = screen.getByText(/Test Title/i);
    expect(titleElement).toBeInTheDocument();
  });

  // Test pour vérifier que les boutons sont rendus avec les labels corrects
  test('renders buttons with correct labels', () => {
    render(<CTASection title="Test Title" ctas={ctas} />);
    const button1 = screen.getByText(/Button 1/i);
    const button2 = screen.getByText(/Button 2/i);
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });

  // Test pour vérifier que les boutons sont rendus avec les href corrects
  test('renders buttons with correct href', () => {
    render(<CTASection title="Test Title" ctas={ctas} />);
    const button1 = screen.getByText(/Button 1/i).closest('a');
    const button2 = screen.getByText(/Button 2/i).closest('a');
    expect(button1).toHaveAttribute('href', 'https://example.com/1');
    expect(button2).toHaveAttribute('href', 'https://example.com/2');
  });

  // Test pour vérifier que les classes personnalisées sont appliquées correctement
  test('applies custom classes correctly', () => {
    const { container } = render(<CTASection title="Test Title" ctas={ctas} customClass="custom-section-class" />);
    expect(container.firstChild).toHaveClass('custom-section-class');
  });
});
