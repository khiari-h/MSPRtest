import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../../../config/axiosConfig';
import ArtistMeeting from '../../../../components/organisms/ProgrammingOrganisms/ArtistMeeting';

jest.mock('../../../../config/axiosConfig');

describe('ArtistMeeting Component', () => {
  const mockData = [
    {
      id: 349,
      acf: {
        nom: 'Dédicasse avec Poppi',
        description: 'Venez dédicacer vos albums avec Poppi',
        photo: 'photo1.jpg',
        date: '20240831',
        heuredebut: '00:00:00',
        heurefin: '18:00:00',
        lieu: 'SceneMarais',
        type: 'Rock',
      }
    },
    {
      id: 347,
      acf: {
        nom: 'Séance d\'autographe avec Jazzi',
        description: 'Venez signer des autographes avec Jazzi',
        photo: 'photo3.jpg',
        date: '20240831',
        heuredebut: '00:00:00',
        heurefin: '14:00:00',
        lieu: 'ScenePontNeuf',
        type: 'Jazz',
      }
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
  });

  test('renders artist meetings correctly', async () => {
    render(<ArtistMeeting />);

    // Attendre que le composant se charge et vérifier que les rencontres sont affichées
    await waitFor(() => {
      expect(screen.getByText(/Dédicasse avec Poppi/i)).toBeInTheDocument();
      expect(screen.getByText(/Séance d'autographe avec Jazzi/i)).toBeInTheDocument();
    });

    // Vérifiez que les descriptions sont également présentes
    expect(screen.getByText(/Venez dédicacer vos albums avec Poppi/i)).toBeInTheDocument();
    expect(screen.getByText(/Venez signer des autographes avec Jazzi/i)).toBeInTheDocument();
  });

  test('displays loading and error states', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('Erreur lors de la récupération des données.')));
    render(<ArtistMeeting />);

    // Vérifier que le message de chargement est affiché
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument();

    // Attendre que l'erreur soit affichée
    await waitFor(() => expect(screen.getByText(/Erreur lors de la récupération des données/i)).toBeInTheDocument());
  });
});
