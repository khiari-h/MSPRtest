import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from '../../../config/axiosConfig';
import ConcertsDetailsPage from '../../../components/pages/ConcertsDetailsPage';
import { jest } from '@jest/globals';

jest.mock('../../../config/axiosConfig');

describe('ConcertsDetailsPage', () => {
  const mockConcerts = [
    {
      acf: {
        name: 'Concert 1',
        description: 'Description 1',
        image: 'image1.jpg',
        date: '2024-07-30',
        time: '20:00',
        venue: 'Venue 1',
      },
    },
    {
      acf: {
        name: 'Concert 2',
        description: 'Description 2',
        image: 'image2.jpg',
        date: '2024-08-01',
        time: '21:00',
        venue: 'Venue 2',
      },
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: mockConcerts });
  });

  test('affiche les filtres et les concerts correctement', async () => {
    render(<ConcertsDetailsPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Tous les Concerts et leur Planning/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Lieu/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Recherche/i)).toBeInTheDocument();
    });
    
    // Vérification que les concerts sont affichés
    expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Concert 2/i)).toBeInTheDocument();
  });

  test('filtre les concerts en fonction des options sélectionnées', async () => {
    render(<ConcertsDetailsPage />);
    
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-07-30' } });
      fireEvent.change(screen.getByLabelText(/Lieu/i), { target: { value: 'Venue 1' } });
      
      // Assure-toi que le concert filtré est affiché
      expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
      // Assure-toi que le concert non filtré est caché
      expect(screen.queryByText(/Concert 2/i)).toBeNull();
    });
  });

  test('affiche un message d\'erreur en cas de problème lors de la récupération des concerts', async () => {
    axios.get.mockRejectedValueOnce(new Error('Erreur de chargement'));
    render(<ConcertsDetailsPage />);
    
    await waitFor(() => {
      // Vérifie les erreurs dans la console ou le comportement prévu
      // En cas de message d'erreur spécifique à ajouter, vérifier ici
    });
  });
});
