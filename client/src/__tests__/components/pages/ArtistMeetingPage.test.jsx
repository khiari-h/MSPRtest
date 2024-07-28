// src/__tests__/components/pages/ArtistMeetingPage.test.jsx
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import ArtistMeetingPage from '../../../components/pages/ArtistMeetingPage';
import { jest } from '@jest/globals';

jest.mock('axios');

const mockData = [
  {
    acf: {
      artist: 'Artiste 1',
      description: 'Description 1',
      image: 'image1.jpg',
      date: '2024-07-30',
      time: '20:00',
      venue: 'Lieu 1',
    },
  },
  {
    acf: {
      artist: 'Artiste 2',
      description: 'Description 2',
      image: 'image2.jpg',
      date: '2024-08-01',
      time: '21:00',
      venue: 'Lieu 2',
    },
  },
];

describe('ArtistMeetingPage', () => {
  test('affiche un message de chargement pendant le chargement des données', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
      render(<ArtistMeetingPage />);
    });

    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  test('affiche un message d\'erreur en cas de problème lors de la récupération des données', async () => {
    axios.get.mockRejectedValueOnce(new Error('Erreur de chargement'));

    await act(async () => {
      render(<ArtistMeetingPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la récupération des rencontres avec les artistes !')).toBeInTheDocument();
    });
  });

  test('affiche les informations des réunions artistiques lorsqu\'elles sont chargées', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    await act(async () => {
      render(<ArtistMeetingPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Artiste 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Artiste 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
    });
  });
});
