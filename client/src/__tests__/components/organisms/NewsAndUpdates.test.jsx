import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../../config/axiosConfig';
import NewsAndUpdates from '../../../components/organisms/NewsAndUpdates';
import { jest } from '@jest/globals';

jest.mock('../../../config/axiosConfig');

const mockData = [
  {
    id: 1,
    title: 'News 1',
    description: 'Description 1',
  },
  {
    id: 2,
    title: 'News 2',
    description: 'Description 2',
  },
  {
    id: 3,
    title: 'News 3',
    description: 'Description 3',
  },
];

describe('NewsAndUpdates Component', () => {
  test('renders loading state initially', () => {
    axios.get.mockResolvedValueOnce({ data: mockData });
    render(<NewsAndUpdates />);
    
    expect(screen.getByText(/Chargement.../i)).toBeInTheDocument();
  });

  test('renders news items after successful data fetch', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });
    render(<NewsAndUpdates />);

    await waitFor(() => {
      mockData.forEach((newsItem) => {
        expect(screen.getByText(newsItem.title)).toBeInTheDocument();
        expect(screen.getByText(newsItem.description)).toBeInTheDocument();
      });
    });
  });

  test('renders error message on data fetch failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Erreur lors de la récupération des données.'));
    render(<NewsAndUpdates />);

    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de la récupération des données./i)).toBeInTheDocument();
    });
  });

  test('renders "Voir toutes les actualités" button after successful data fetch', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });
    render(<NewsAndUpdates />);

    await waitFor(() => {
      expect(screen.getByText(/Voir toutes les actualités/i)).toBeInTheDocument();
    });
  });
});
