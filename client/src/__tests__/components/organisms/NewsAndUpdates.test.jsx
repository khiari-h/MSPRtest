import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../../config/axiosConfig';
import NewsAndUpdates from '../../../components/organisms/NewsAndUpdates';

// Mock du module axiosConfig
jest.mock('../../../config/axiosConfig'); 

describe('NewsAndUpdates Component', () => {
  const mockNewsData = [
    { title: 'Actualité 1', description: 'Description 1' },
    { title: 'Actualité 2', description: 'Description 2' },
    { title: 'Actualité 3', description: 'Description 3' },
    { title: 'Actualité 4', description: 'Description 4' },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockNewsData });
  });

  test('renders the news section with news items', async () => {
    render(<NewsAndUpdates />);

    // Vérifie que le titre de la section est présent
    expect(screen.getByText('Actualités')).toBeInTheDocument();
    expect(screen.getByText(/chargement/i)).toBeInTheDocument();

    await waitFor(() => {
      // Vérifie que les actualités sont chargées et affichées
      mockNewsData.slice(0, 3).forEach(newsItem => {
        expect(screen.getByText(newsItem.title)).toBeInTheDocument();
        expect(screen.getByText(newsItem.description)).toBeInTheDocument();
      });
    });

    // Vérifie que le bouton "Voir toutes les actualités" est présent
    const button = screen.getByRole('link', { name: /voir toutes les actualités/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/news');
  });

  test('displays an error message when data fetching fails', async () => {
    axios.get.mockRejectedValue(new Error('Erreur lors de la récupération des données.'));

    render(<NewsAndUpdates />);

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la récupération des données.')).toBeInTheDocument();
    });
  });
});
