import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../../config/axiosConfig';
import ProgrammingOverview from '../../../components/organisms/ProgrammingOverview';

jest.mock('../../../config/axiosConfig');

const mockConcertData = [
  {
    acf: {
      nom: 'Concert 1',
      description: 'Description Concert 1',
      photo: 'concert1.jpg'
    }
  }
];

const mockArtistMeetingData = [
  {
    acf: {
      nom: 'Rencontre Artiste 1',
      description: 'Description Rencontre 1',
      photo: 'artist1.jpg'
    }
  }
];

const mockWorkshopData = [
  {
    name: 'Atelier 1',
    description: 'Description Atelier 1',
    photo: 'workshop1.jpg'
  }
];

describe('ProgrammingOverview Component', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      switch (url) {
        case 'https://nationsounds.online/wp-json/wp/v2/concerts':
          return Promise.resolve({ data: mockConcertData });
        case 'https://nationsounds.online/wp-json/wp/v2/artists_meetings':
          return Promise.resolve({ data: mockArtistMeetingData });
        case '/api/workshops':
          return Promise.resolve({ data: mockWorkshopData });
        default:
          return Promise.reject(new Error('not found'));
      }
    });
  });

  test('charge et affiche les concerts, les rencontres et les ateliers', async () => {
    render(<ProgrammingOverview />);
    
    // Attendre que l'en-tête soit affiché
    await waitFor(() => expect(screen.getByText(/Programmation/i)).toBeInTheDocument());

    // Vérifie que le concert est affiché
    expect(screen.getAllByText(/Concert 1/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Description Concert 1/i)).toBeInTheDocument();

    // Vérifie que la rencontre artiste est affichée
    expect(screen.getAllByText(/Rencontre Artiste 1/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Description Rencontre 1/i)).toBeInTheDocument();

    // Vérifie que l'atelier est affiché
    expect(screen.getAllByText(/Atelier 1/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Description Atelier 1/i)).toBeInTheDocument();
  });

  test('affiche un message d\'erreur en cas d\'échec de récupération des données', async () => {
    axios.get.mockRejectedValueOnce(new Error('Erreur lors de la récupération des données.'));
    render(<ProgrammingOverview />);
    
    // Attendre que le message d'erreur soit affiché
    await waitFor(() => expect(screen.getByText(/Erreur lors de la récupération des données/i)).toBeInTheDocument());
  });
});
