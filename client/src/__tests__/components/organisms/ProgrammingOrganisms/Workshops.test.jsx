import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from '../../../../config/axiosConfig';
import Workshops from '../../../../components/organisms/ProgrammingOrganisms/Workshops';

jest.mock('../../../../config/axiosConfig');

describe('Workshops Component', () => {
  const mockData = [
    {
      id: 1,
      name: 'Workshop 1',
      description: 'Description 1',
      photo: 'photo1.jpg',
      date: '2022-01-01',
      time: '10:00',
      venue: 'Lieu 1',
      type: 'Type 1',
      duration: '2'
    },
    {
      id: 2,
      name: 'Workshop 2',
      description: 'Description 2',
      photo: 'photo2.jpg',
      date: '2022-02-01',
      time: '14:00',
      venue: 'Lieu 2',
      type: 'Type 2',
      duration: '3'
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
  });

  test('loads and displays workshops', async () => {
    render(<Workshops />);
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Ateliers/i)).toBeInTheDocument());
    expect(screen.getByText(/Workshop 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Workshop 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
  });

  test('filters workshops correctly', async () => {
    render(<Workshops />);
    await waitFor(() => expect(screen.getByText(/Ateliers/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '01/01/2022' } });
    expect(screen.getByText(/Workshop 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Workshop 2/i)).not.toBeInTheDocument();
  });

  test('registers to a workshop successfully', async () => {
    render(<Workshops />);
    await waitFor(() => expect(screen.getByText(/Ateliers/i)).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText(/Prénom/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Nom/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Sélectionnez un atelier/i), { target: { value: '1' } });

    axios.post.mockResolvedValue({ data: { message: 'Inscription réussie!' } });
    
    fireEvent.click(screen.getByText(/S'inscrire/i));

    await waitFor(() => expect(screen.getByText(/Inscription réussie!/i)).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(/Inscription réussie!/i)).not.toBeInTheDocument(), { timeout: 4000 });
  });

  test('handles registration errors correctly', async () => {
    render(<Workshops />);
    await waitFor(() => expect(screen.getByText(/Ateliers/i)).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText(/Prénom/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Nom/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Sélectionnez un atelier/i), { target: { value: '1' } });

    axios.post.mockRejectedValue({ response: { data: { message: 'Erreur lors de l\'inscription.' } } });

    fireEvent.click(screen.getByText(/S'inscrire/i));

    await waitFor(() => expect(screen.getByText(/Erreur lors de l'inscription./i)).toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(/Erreur lors de l'inscription./i)).not.toBeInTheDocument(), { timeout: 4000 });
  });
});
