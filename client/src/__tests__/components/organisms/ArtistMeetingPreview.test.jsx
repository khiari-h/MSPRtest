import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from '../../../config/axiosConfig';
import ArtistMeetingPreview from '../../../components/organisms/ArtistMeetingPreview';

// Mock axios module
jest.mock('../../../config/axiosConfig');

describe('ArtistMeetingPreview', () => {
  test('renders loading state', async () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // Never resolves, so stays in loading state

    await act(async () => {
      render(<ArtistMeetingPreview />);
    });

    // Wait for the loading state to be displayed
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching data'));

    await act(async () => {
      render(<ArtistMeetingPreview />);
    });

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la récupération des données.')).toBeInTheDocument();
    });
  });

  test('renders meetings when data is fetched successfully', async () => {
    const mockData = [
      {
        id: 1,
        acf: {
          nom: 'Artist 1',
          description: 'Description 1',
          photo: 'https://nationsounds.online/wp-content/uploads/2024/07/meeting1.jpg',
          date: '2024-07-27',
          heure: '14:00',
          lieu: 'Lieu 1',
          type: 'Rock'
        }
      },
      {
        id: 2,
        acf: {
          nom: 'Artist 2',
          description: 'Description 2',
          photo: 'https://nationsounds.online/wp-content/uploads/2024/07/meeting2.jpg',
          date: '2024-07-28',
          heure: '15:00',
          lieu: 'Lieu 2',
          type: 'Pop'
        }
      }
    ];
    axios.get.mockResolvedValue({ data: mockData });

    await act(async () => {
      render(<ArtistMeetingPreview />);
    });

    await waitFor(() => {
      expect(screen.getByText('Rencontres avec les Artistes')).toBeInTheDocument();
      expect(screen.getByText('Artist 1')).toBeInTheDocument();
      expect(screen.getByText('Artist 2')).toBeInTheDocument();
      // Verify that images are rendered
      expect(screen.getByAltText('Image de Artist 1')).toBeInTheDocument();
      expect(screen.getByAltText('Image de Artist 2')).toBeInTheDocument();
    });
  });

  test('renders "Voir Plus" button', async () => {
    axios.get.mockResolvedValue({ data: [] });

    await act(async () => {
      render(<ArtistMeetingPreview />);
    });

    await waitFor(() => {
      expect(screen.getByText('Voir Plus')).toBeInTheDocument();
    });
  });
});
