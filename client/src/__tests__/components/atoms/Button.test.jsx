import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button Component', () => {
  // Test pour vérifier que le bouton est rendu avec le texte correct
  test('renders the button with string label', () => {
    render(<Button label="Click Me" />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  // Test pour vérifier que le bouton est rendu avec un numéro comme label
  test('renders the button with number label', () => {
    render(<Button label={1} />);
    const buttonElement = screen.getByText(/1/i);
    expect(buttonElement).toBeInTheDocument();
  });

  // Test pour vérifier que la fonction onClick est appelée lorsque le bouton est cliqué
  test('calls the onClick handler when clicked', () => {
    const onClick = jest.fn();
    render(<Button label="Click Me" onClick={onClick} />);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // Test pour vérifier que le bouton est rendu comme un lien lorsqu'une href est fournie
  test('renders the button with href as a link', () => {
    render(<Button label="Click Me" href="https://example.com" />);
    const linkElement = screen.getByText(/Click Me/i);
    expect(linkElement.closest('a')).toHaveAttribute('href', 'https://example.com');
  });

  // Test pour vérifier que les classes spécifiques sont appliquées lorsque isSelected est vrai
  test('applies selected classes when isSelected is true', () => {
    render(<Button label="Click Me" isSelected />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toHaveClass('bg-light-blue');
  });
});
