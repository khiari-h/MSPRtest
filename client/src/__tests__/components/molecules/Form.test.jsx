// src/__tests__/components/molecules/Form.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../../../components/molecules/Form';
import Input from '../../../components/atoms/Input';
import Label from '../../../components/atoms/Label';
import Button from '../../../components/atoms/Button';

test('renders form with fields and handles submit', () => {
  const handleSubmit = jest.fn();
  const fields = [
    {
      label: 'Username',
      type: 'text',
      name: 'username',
      placeholder: 'Enter your username',
      value: '',
      onChange: jest.fn(),
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: 'Enter your password',
      value: '',
      onChange: jest.fn(),
    },
  ];

  const { getByPlaceholderText, getByText } = render(<Form fields={fields} onSubmit={handleSubmit} />);

  // Vérifie que les champs de saisie et le bouton de soumission sont présents
  expect(getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  expect(getByText(/submit/i)).toBeInTheDocument();

  // Simule la soumission du formulaire
  fireEvent.submit(getByText(/submit/i));
  expect(handleSubmit).toHaveBeenCalled();
});
