// __tests__/ContactForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ContactForm from '../../../components/organisms/ContactForm';

// Mock axios module
jest.mock('axios');

describe('ContactForm', () => {
  test('renders form with fields and submit button', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Nom')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Sujet')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByText('Envoyer')).toBeInTheDocument();
  });

  test('shows validation errors when fields are empty and form is submitted', async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByText('Envoyer'));

    expect(await screen.findByText('Le nom est requis')).toBeInTheDocument();
    expect(await screen.findByText('L\'email est requis')).toBeInTheDocument();
    expect(await screen.findByText('Le sujet est requis')).toBeInTheDocument();
    expect(await screen.findByText('Le message est requis')).toBeInTheDocument();
  });

  test('submits form and shows success message on successful post request', async () => {
    axios.post.mockResolvedValue({ data: {} });
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Sujet'), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'This is a test message.' } });

    fireEvent.click(screen.getByText('Envoyer'));

    await waitFor(() => expect(screen.getByText('Message envoyé avec succès!')).toBeInTheDocument());
  });

  test('shows error message on failed post request', async () => {
    axios.post.mockRejectedValue(new Error('Error sending message'));
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Sujet'), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'This is a test message.' } });

    fireEvent.click(screen.getByText('Envoyer'));

    await waitFor(() => expect(screen.getByText('Erreur lors de l\'envoi du message.')).toBeInTheDocument());
  });
});
