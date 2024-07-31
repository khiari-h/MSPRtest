import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from '../../config/axiosConfig';
import NewsPage from '../../../components/pages/NewsPage';
import { jest } from '@jest/globals';

jest.mock('../../config/axiosConfig');

const mockNews = [
  { id: 1, title: 'Concert News', description: 'Description 1', category: 'concert', importance: 1 },
  { id: 2, title: 'Info News', description: 'Description 2', category: 'info', importance: 2 },
  { id: 3, title: 'Interview News', description: 'Description 3', category: 'interview', importance: 3 },
  { id: 4, title: 'Event News', description: 'Description 4', category: 'event', importance: 4 },
  { id: 5, title: 'Organization News', description: 'Description 5', category: 'organization', importance: 5 }
];

describe('NewsPage', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockNews });
  });

  test('renders news items after successful data fetch', async () => {
    render(<NewsPage />);

    await waitFor(() => {
      mockNews.forEach(newsItem => {
        expect(screen.getByText(newsItem.title)).toBeInTheDocument();
        expect(screen.getByText(newsItem.description)).toBeInTheDocument();
      });
    });
  });

  test('renders filter buttons based on categories in data', async () => {
    render(<NewsPage />);

    await waitFor(() => {
      expect(screen.getByText('Tous')).toBeInTheDocument();
      expect(screen.getByText('Concert')).toBeInTheDocument();
      expect(screen.getByText('Info')).toBeInTheDocument();
      expect(screen.getByText('Interview')).toBeInTheDocument();
      expect(screen.getByText('Event')).toBeInTheDocument();
      expect(screen.getByText('Organization')).toBeInTheDocument();
    });
  });

  test('filters news items based on category', async () => {
    render(<NewsPage />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Concert'));
      expect(screen.getByText('Concert News')).toBeInTheDocument();
      expect(screen.queryByText('Info News')).toBeNull();

      fireEvent.click(screen.getByText('Info'));
      expect(screen.getByText('Info News')).toBeInTheDocument();
      expect(screen.queryByText('Concert News')).toBeNull();
    });
  });

  test('renders pagination buttons', async () => {
    render(<NewsPage />);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
      // Add more assertions for other page numbers if there are more pages
    });
  });
});
