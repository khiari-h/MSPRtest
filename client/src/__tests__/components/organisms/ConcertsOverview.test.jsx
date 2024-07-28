// __tests__/ConcertsOverview.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from '../../../config/axiosConfig';
import ConcertsOverview from '../../../components/organisms/ConcertsOverview';

// Mock axios module
jest.mock('../../../config/axiosConfig');

describe('ConcertsOverview', () => {
  test('renders loading state', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<ConcertsOverview />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching data'));
    render(<ConcertsOverview />);
    await waitFor(() => expect(screen.getByText('Erreur lors de la récupération des données.')).toBeInTheDocument());
  });

  test('renders concerts when data is fetched successfully', async () => {
    const mockData = [
      {
        acf: {
          name: 'Concert 1',
          description: 'Description 1',
          image: 'image1.jpg',
          date: '2024-07-27',
          time: '20:00',
          venue: 'Venue 1'
        }
      },
      {
        acf: {
          name: 'Concert 2',
          description: 'Description 2',
          image: 'image2.jpg',
          date: '2024-07-28',
          time: '21:00',
          venue: 'Venue 2'
        }
      }
    ];
    axios.get.mockResolvedValue({ data: mockData });
    render(<ConcertsOverview />);
    await waitFor(() => {
      expect(screen.getByText('Programme et Planning des Concerts')).toBeInTheDocument();
      expect(screen.getByText('Concert 1')).toBeInTheDocument();
      expect(screen.getByText('Concert 2')).toBeInTheDocument();
    });
  });

  test('renders "Voir Plus de Concerts" button', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<ConcertsOverview />);
    await waitFor(() => {
      expect(screen.getByText('Voir Plus de Concerts')).toBeInTheDocument();
    });
  });
});
