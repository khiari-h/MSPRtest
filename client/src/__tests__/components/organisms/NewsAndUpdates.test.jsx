import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../../config/axiosConfig';
import NewsAndUpdates from '../../../components/organisms/NewsAndUpdates';

// Mock du module axiosConfig
jest.mock('../../../config/axiosConfig');

describe('NewsAndUpdates Component', () => {
  const mockNewsData = [
    { title: 'Nouveau concert annoncé', description: 'Un nouveau concert sera organisé le 20 août avec des artistes locaux.' },
    { title: 'Nouveau concert annoncé', description: 'Un nouveau concert sera organisé le 20 août avec des artistes locaux.' },
    { title: 'Nouveau concert annoncé', description: 'Un nouveau concert sera organisé le 20 août avec des artistes locaux.' },
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
      const titles = screen.getAllByText('Nouveau concert annoncé');
      const descriptions = screen.getAllByText(/Un nouveau concert sera organisé le 20 août avec des artistes locaux./);

      expect(titles).toHaveLength(mockNewsData.length);
      expect(descriptions).toHaveLength(mockNewsData.length);

      // Vérifie que chaque titre correspond à la bonne description si nécessaire
      titles.forEach((title, index) => {
        expect(title).toBeInTheDocument();
        expect(descriptions[index]).toBeInTheDocument();
      });
    });

    // Vérifie que le bouton "Voir toutes les actualités" est présent
    const button = screen.getByRole('link', { name: /voir toutes les actualités/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/news');
  });

  test('displays an error message when data fetching fails', async () => {
    // Mock temporaire pour masquer les logs d'erreurs dans la console pendant ce test
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    axios.get.mockRejectedValueOnce(new Error('Erreur lors de la récupération des données.'));

    render(<NewsAndUpdates />);

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la récupération des données.')).toBeInTheDocument();
    });

    // Rétablir le comportement normal de console.error
    consoleErrorMock.mockRestore();
  });
});
