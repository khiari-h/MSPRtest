import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from '../../../config/axiosConfig';
import ConcertsOverview from '../../../components/organisms/ConcertsOverview';

jest.mock('../../../config/axiosConfig');

const mockConcertData = [
  {
    id: 370,
    acf: {
      nom: 'Tes fr',
      description: 'fdfdfsd',
      date: '20240804',
      heuredebut: '00:00:00',
      heurefin: '04:00:00',
      lieu: 'ScenePrincipale',
      type: 'Rock',
      photo: '',
    },
  },
  {
    id: 367,
    acf: {
      nom: 'A',
      description: 'tset',
      date: '20240803',
      heuredebut: '19:00:00',
      heurefin: '20:00:00',
      lieu: 'ScenePontNeuf',
      type: 'Rock',
      photo: '',
    },
  },
  {
    id: 364,
    acf: {
      nom: 'Test',
      description: 'Test du filtre',
      date: '20240803',
      heuredebut: '19:30:00',
      heurefin: '22:00:00',
      lieu: 'SceneMarais',
      type: 'Rock',
      photo: '',
    },
  },
];

describe('ConcertsOverview Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockConcertData });
  });

  test('charge et affiche les concerts', async () => {
    render(<ConcertsOverview />);

    // Attendre que le message de chargement soit affiché
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument();

    // Attendre que les concerts soient chargés et affichés
    await waitFor(() => {
      const concertTitles = screen.getAllByRole('heading', { level: 3 });
      expect(concertTitles[0]).toHaveTextContent('Tes fr');
      expect(concertTitles[1]).toHaveTextContent('A');
      expect(concertTitles[2]).toHaveTextContent('Test');
    });
  });


  test('affiche un message d\'erreur si la récupération des concerts échoue', async () => {
    axios.get.mockRejectedValue(new Error('Erreur lors de la récupération des concerts.'));
    render(<ConcertsOverview />);

    await waitFor(() => expect(screen.getByText(/Erreur lors de la récupération des données/i)).toBeInTheDocument());
  });
});
