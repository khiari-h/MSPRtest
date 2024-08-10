import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from '../../../config/axiosConfig';
import NewsPage from '../../../components/pages/NewsPage';

jest.mock('../../../config/axiosConfig');

describe('NewsPage', () => {
  const mockNews = [
    {
      title: 'News 1',
      description: 'Description 1',
      category: 'Category 1',
      importance: 1,
    },
    {
      title: 'News 2',
      description: 'Description 2',
      category: 'Category 2',
      importance: 2,
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockNews });
  });

  test('fetches and displays news on load', async () => {
    render(<NewsPage />);

    expect(await screen.findByText('News 1')).toBeInTheDocument();
    expect(screen.getByText('News 2')).toBeInTheDocument();
  });

  test('filters news based on selected category', async () => {
    render(<NewsPage />);

    await waitFor(() => screen.findByText('News 1'));

    fireEvent.click(screen.getByText('Category 1'));

    expect(screen.getByText('News 1')).toBeInTheDocument();
    expect(screen.queryByText('News 2')).not.toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Erreur lors de la récupération des actualités!'));

    render(<NewsPage />);

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la récupération des actualités!')).toBeInTheDocument();
    });
  });

  test('paginates news items correctly', async () => {
    const mockPaginatedNews = Array.from({ length: 10 }, (_, index) => ({
      title: `News ${index + 1}`,
      description: `Description ${index + 1}`,
      category: 'Category 1',
      importance: index + 1,
    }));

    axios.get.mockResolvedValue({ data: mockPaginatedNews });

    render(<NewsPage />);

    expect(await screen.findByText('News 1')).toBeInTheDocument();
    expect(screen.getByText('News 6')).toBeInTheDocument();
    expect(screen.queryByText('News 7')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('2'));

    expect(await screen.findByText('News 7')).toBeInTheDocument();
    expect(screen.getByText('News 10')).toBeInTheDocument();
    expect(screen.queryByText('News 1')).not.toBeInTheDocument();
  });
});
