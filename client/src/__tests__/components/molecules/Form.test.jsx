import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../../../components/molecules/Form';

describe('Form Component', () => {
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();
  const fields = [
    {
      label: 'Name',
      type: 'text',
      name: 'name',
      placeholder: 'Enter your name',
      value: '',
      onChange: mockOnChange,
      required: true,
      error: '',
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'Enter your email',
      value: '',
      onChange: mockOnChange,
      required: true,
      error: '',
    },
  ];

  // Test pour vérifier que tous les champs sont rendus avec les labels corrects
  test('renders all fields with correct labels', () => {
    render(<Form fields={fields} onSubmit={mockOnSubmit} />);
    fields.forEach(field => {
      const labelElement = screen.getByText(new RegExp(field.label, 'i'));
      expect(labelElement).toBeInTheDocument();
    });
  });

  // Test pour vérifier que la fonction onSubmit est appelée lorsque le formulaire est soumis
  test('calls onSubmit when the form is submitted', () => {
    const { container } = render(<Form fields={fields} onSubmit={mockOnSubmit} />);
    const form = container.querySelector('form'); // Sélectionnez le formulaire directement
    fireEvent.submit(form); // Simulez la soumission du formulaire
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  // Test pour vérifier que les champs déclenchent la fonction onChange lors de la modification
  test('calls onChange when input values are changed', () => {
    render(<Form fields={fields} onSubmit={mockOnSubmit} />);
    fields.forEach(field => {
      const inputElement = screen.getByPlaceholderText(new RegExp(field.placeholder, 'i'));
      fireEvent.change(inputElement, { target: { value: 'test' } });
      expect(mockOnChange).toHaveBeenCalledTimes(fields.indexOf(field) + 1); // Vérifiez que onChange a été appelé le bon nombre de fois
    });
  });
});
