// src/__tests__/components/pages/NewsPage.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NewsPage from '../../../components/pages/NewsPage';
import axios from 'axios';
import { jest } from '@jest/globals';

jest.mock('axios');

const mockNews = [
  { id: 1, title: 'News 1', content: 'Content 1' },
  { id: 2, title: 'News 2', content: 'Content 2' },
  { id: 3, title: 'News 3', content: 'Content 3' },
];

describe('NewsPage', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockNews });
  });

  test('rend le NewsPageTemplate avec les boutons de filtre et les éléments d\'actualités', async () => {
    render(<NewsPage />);

    await waitFor(() => {
      // Utiliser getByRole pour obtenir le bouton "Tous"
      const tousButton = screen.getByRole('button', { name: /afficher toutes les actualités/i });
      expect(tousButton).toBeInTheDocument();
      expect(tousButton).toHaveAttribute('aria-pressed', 'true');

      const concertsButton = screen.getByRole('button', { name: /afficher les actualités de concerts/i });
      expect(concertsButton).toBeInTheDocument();

      const infosButton = screen.getByRole('button', { name: /afficher les informations/i });
      expect(infosButton).toBeInTheDocument();

      const newsItems = mockNews.map(news => news.title);
      newsItems.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });
});
