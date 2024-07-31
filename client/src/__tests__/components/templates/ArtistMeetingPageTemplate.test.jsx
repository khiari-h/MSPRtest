// src/__tests__/components/pages/ArtistMeetingsPage.test.jsx
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
      type: 'Rock',
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
      type: 'Pop',
    },
  },
];

const mockTypes = ['Rock', 'Pop'];

describe('ArtistMeetingsPage', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === 'https://nationsounds.online/wp-json/wp/v2/artists_meetings') {
        return Promise.resolve({ data: mockData });
      } else if (url === 'https://nationsounds.online/wp-json/wp/v2/artists_types') {
        return Promise.resolve({ data: mockTypes });
      }
      return Promise.reject(new Error('Unknown URL'));
    });
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
      expect(screen.getByText(/Erreur lors de la récupération des rencontres avec les artistes !/i)).toBeInTheDocument();
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

  test('filtre les réunions artistiques en fonction du type sélectionné', async () => {
    render(<ArtistMeetingsPage />);
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Type d'Artiste/i), { target: { value: 'Rock' } });
    });
    expect(screen.getByText(/Artiste 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Artiste 2/i)).toBeNull();
  });

  test('filtre les réunions artistiques en fonction de la recherche par nom', async () => {
    render(<ArtistMeetingsPage />);
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Recherche/i), { target: { value: 'Artiste 2' } });
    });
    expect(screen.getByText(/Artiste 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Artiste 1/i)).toBeNull();
  });
});
