import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ArtistMeetingsPage from '../../../components/pages/ArtistMeetingPage';
import { jest } from '@jest/globals';

jest.mock('axios');

const mockData = [
  {
    id: 1,
    acf: {
      nom: 'Artiste 1',
      description: 'Description 1',
      photo: 'https://nationsounds.online/wp-content/uploads/2024/07/meeting1.jpg',
      date: '2024-07-30',
      heure: '20:00',
      lieu: 'Lieu 1',
      type: 'Rock'
    },
  },
  {
    id: 2,
    acf: {
      nom: 'Artiste 2',
      description: 'Description 2',
      photo: 'https://nationsounds.online/wp-content/uploads/2024/07/meeting2.jpg',
      date: '2024-08-01',
      heure: '21:00',
      lieu: 'Lieu 2',
      type: 'Pop'
    },
  },
];

describe('ArtistMeetingsPage', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
  });

  test('affiche un message de chargement pendant le chargement des données', () => {
    axios.get.mockImplementation(() => new Promise(() => {}));
    render(<ArtistMeetingsPage />);
    expect(screen.getByText(/Chargement.../i)).toBeInTheDocument();
  });

  test('affiche un message d\'erreur en cas de problème lors de la récupération des données', async () => {
    axios.get.mockRejectedValueOnce(new Error('Erreur de chargement'));
    render(<ArtistMeetingsPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de la récupération des données./i)).toBeInTheDocument();
    });
  });

  test('affiche les informations des réunions artistiques lorsqu\'elles sont chargées', async () => {
    render(<ArtistMeetingsPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Artiste 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Artiste 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
      // Verify that images are rendered
      expect(screen.getByAltText('Image de Artiste 1')).toBeInTheDocument();
      expect(screen.getByAltText('Image de Artiste 2')).toBeInTheDocument();
    });
  });

  test('filtre les artistes en fonction des options sélectionnées', async () => {
    render(<ArtistMeetingsPage />);
    
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Type d'Artiste/i), { target: { value: 'Rock' } });
      
      // Assure-toi que l'artiste filtré est affiché
      expect(screen.getByText(/Artiste 1/i)).toBeInTheDocument();
      // Assure-toi que l'artiste non filtré est caché
      expect(screen.queryByText(/Artiste 2/i)).toBeNull();
    });
  });
});
