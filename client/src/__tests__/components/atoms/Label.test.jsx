import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from '../../../components/atoms/Label';

test('renders label with correct htmlFor and text', () => {
  render(
    <>
      <Label htmlFor="username" text="Username" />
      <input id="username" />
    </>
  );
  
  // Vérifie que le label a le bon htmlFor et texte
  const labelElement = screen.getByLabelText(/username/i);
  expect(labelElement).toBeInTheDocument();
  expect(labelElement).toHaveAttribute('id', 'username');
});
