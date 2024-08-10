import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from '../../../config/axiosConfig';
import ConcertsOverview from '../../../components/organisms/ConcertsOverview';

jest.mock('../../../config/axiosConfig');

const mockConcertData = [
  {
    acf: {
      nom: 'Concert 1',
      description: 'Description Concert 1',
      photo: 'concert1.jpg',
      lieu: 'Lieu 1',
      type: 'Type 1'
    }
  },
  {
    acf: {
      nom: 'Concert 2',
      description: 'Description Concert 2',
      photo: 'concert2.jpg',
      lieu: 'Lieu 2',
      type: 'Type 2'
    }
  }
];

describe('ConcertsOverview Component', () => {
  // Mock des données pour les tests
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockConcertData });
  });

  test('charge et affiche les concerts', async () => {
    render(<ConcertsOverview />);
    // Vérifie que le message de chargement est affiché
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument();
    // Attendre que l'en-tête soit affiché
    await waitFor(() => expect(screen.getByText(/Planning des Concerts/i)).toBeInTheDocument());

    // Vérifie que les concerts sont affichés
    expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Description Concert 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Concert 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Description Concert 2/i)).toBeInTheDocument();
  });

  test('filtre les concerts correctement', async () => {
    render(<ConcertsOverview showFilters={true} />);
    // Attendre que l'en-tête soit affiché
    await waitFor(() => expect(screen.getByText(/Planning des Concerts/i)).toBeInTheDocument());

    // Appliquer le filtre par lieu
    fireEvent.change(screen.getByLabelText(/Lieu/i), { target: { value: 'Lieu 1' } });
    await waitFor(() => {
      expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Concert 2/i)).not.toBeInTheDocument();
    });

    // Appliquer le filtre par type
    fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: 'Type 2' } });
    await waitFor(() => {
      expect(screen.getByText(/Concert 2/i)).toBeInTheDocument();
      expect(screen.queryByText(/Concert 1/i)).not.toBeInTheDocument();
    });
  });
});
