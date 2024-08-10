import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from '../../../components/atoms/Label';

describe('Label Component', () => {
  // Test pour vérifier que le label est rendu avec le texte correct
  test('renders the label with text', () => {
    render(<Label htmlFor="test-input" text="Test Label" />);
    const labelElement = screen.getByText(/Test Label/i);
    expect(labelElement).toBeInTheDocument();
  });

  // Test pour vérifier que le label est associé au bon input via l'attribut htmlFor
  test('associates the label with the correct input', () => {
    render(<Label htmlFor="test-input" text="Test Label" />);
    const labelElement = screen.getByText(/Test Label/i);
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });
});
