// __tests__/ArtistMeetingPreview.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from '../../../config/axiosConfig';
import ArtistMeetingPreview from '../../../components/organisms/ArtistMeetingPreview';

// Mock axios module
jest.mock('../../../config/axiosConfig');

describe('ArtistMeetingPreview', () => {
  test('renders loading state', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<ArtistMeetingPreview />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching data'));
    render(<ArtistMeetingPreview />);
    await waitFor(() => expect(screen.getByText('Erreur lors de la récupération des données.')).toBeInTheDocument());
  });

  test('renders meetings when data is fetched successfully', async () => {
    const mockData = [
      {
        acf: {
          artist: 'Artist 1',
          description: 'Description 1',
          image: 'image1.jpg'
        }
      },
      {
        acf: {
          artist: 'Artist 2',
          description: 'Description 2',
          image: 'image2.jpg'
        }
      }
    ];
    axios.get.mockResolvedValue({ data: mockData });
    render(<ArtistMeetingPreview />);
    await waitFor(() => {
      expect(screen.getByText('Rencontres avec les Artistes')).toBeInTheDocument();
      expect(screen.getByText('Artist 1')).toBeInTheDocument();
      expect(screen.getByText('Artist 2')).toBeInTheDocument();
    });
  });

  test('renders "Voir Plus" button', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<ArtistMeetingPreview />);
    await waitFor(() => {
      expect(screen.getByText('Voir Plus')).toBeInTheDocument();
    });
  });
});
