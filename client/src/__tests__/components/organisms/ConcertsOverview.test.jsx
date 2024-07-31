import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from '../../../config/axiosConfig';
import ConcertsOverview from '../../../components/organisms/ConcertsOverview';

// Mock axios module
jest.mock('../../../config/axiosConfig');

describe('ConcertsOverview', () => {
  test('renders loading state', async () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // Never resolves, so stays in loading state

    await act(async () => {
      render(<ConcertsOverview />);
    });

    // Wait for the loading state to be displayed
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching data'));

    await act(async () => {
      render(<ConcertsOverview />);
    });

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la récupération des données.')).toBeInTheDocument();
    });
  });

  test('renders concerts when data is fetched successfully', async () => {
    const mockData = [
      {
        id: 1,
        acf: {
          nom: 'Concert 1',
          description: 'Description 1',
          photo: 'https://nationsounds.online/wp-content/uploads/2024/07/concert1.jpg',
          date: '2024-07-27',
          heure: '20:00',
          lieu: 'Lieu 1'
        }
      },
      {
        id: 2,
        acf: {
          nom: 'Concert 2',
          description: 'Description 2',
          photo: 'https://nationsounds.online/wp-content/uploads/2024/07/concert2.jpg',
          date: '2024-07-28',
          heure: '21:00',
          lieu: 'Lieu 2'
        }
      }
    ];
    axios.get.mockResolvedValue({ data: mockData });

    await act(async () => {
      render(<ConcertsOverview />);
    });

    await waitFor(() => {
      expect(screen.getByText('Programme et Planning des Concerts')).toBeInTheDocument();
      expect(screen.getByText('Concert 1')).toBeInTheDocument();
      expect(screen.getByText('Concert 2')).toBeInTheDocument();
      // Verify that images are rendered
      expect(screen.getByAltText('Image de Concert 1')).toBeInTheDocument();
      expect(screen.getByAltText('Image de Concert 2')).toBeInTheDocument();
    });
  });

  test('renders "Voir Plus de Concerts" button', async () => {
    axios.get.mockResolvedValue({ data: [] });

    await act(async () => {
      render(<ConcertsOverview />);
    });

    await waitFor(() => {
      expect(screen.getByText('Voir Plus de Concerts')).toBeInTheDocument();
    });
  });
});
