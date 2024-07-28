// src/__tests__/components/atoms/Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

test('renders button with text and handles click', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button label="Click me" onClick={handleClick} />);
  
  // Vérifie que le texte est présent
  expect(getByText(/click me/i)).toBeInTheDocument();
  
  // Simule un clic sur le bouton
  fireEvent.click(getByText(/click me/i));
  
  // Vérifie que la fonction onClick a été appelée
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('renders link with text and has correct href', () => {
  const { getByText } = render(<Button label="Go to Google" href="https://www.google.com" />);
  
  // Vérifie que le texte est présent
  expect(getByText(/go to google/i)).toBeInTheDocument();
  
  // Vérifie que l'élément est un lien avec l'attribut href correct
  const linkElement = getByText(/go to google/i);
  expect(linkElement).toHaveAttribute('href', 'https://www.google.com');
});
