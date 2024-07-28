// src/__tests__/components/atoms/Input.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

test('renders input with correct attributes and handles change event', () => {
  const handleChange = jest.fn();
  const { getByPlaceholderText } = render(
    <Input
      type="text"
      name="username"
      placeholder="Enter username"
      value="JohnDoe"
      onChange={handleChange}
    />
  );
  
  // Vérifie que l'input a le bon type, nom, placeholder, et valeur
  const inputElement = getByPlaceholderText(/enter username/i);
  expect(inputElement).toHaveAttribute('type', 'text');
  expect(inputElement).toHaveAttribute('name', 'username');
  expect(inputElement).toHaveValue('JohnDoe');
  
  // Simule un changement dans l'input
  fireEvent.change(inputElement, { target: { value: 'JaneDoe' } });
  expect(handleChange).toHaveBeenCalled();
});
