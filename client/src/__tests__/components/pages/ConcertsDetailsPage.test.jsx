import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../../config/axiosConfig';
import ConcertsDetailsPage from '../../../components/pages/ConcertsDetailsPage';

jest.mock('../../../config/axiosConfig');

describe('ConcertsDetailsPage', () => {
  const mockConcerts = [
    {
      acf: {
        nom: 'Concert 1',
        description: 'Description 1',
        photo: 'photo-url-1',
        date: '2024-08-09',
        heuredebut: '18:00',
        heurefin: '20:00',
        lieu: 'Lieu 1',
        type: 'Type 1'
      }
    },
    {
      acf: {
        nom: 'Concert 2',
        description: 'Description 2',
        photo: 'photo-url-2',
        date: '2024-08-10',
        heuredebut: '19:00',
        heurefin: '21:00',
        lieu: 'Lieu 2',
        type: 'Type 2'
      }
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockConcerts });
  });

  test('fetches and displays concerts on load', async () => {
    render(<ConcertsDetailsPage />);

    await waitFor(() => {
      // Targeting the correct elements using getByRole
      const concert1Heading = screen.getByRole('heading', { name: /Concert 1/i });
      const concert2Heading = screen.getByRole('heading', { name: /Concert 2/i });
      
      expect(concert1Heading).toBeInTheDocument();
      expect(concert2Heading).toBeInTheDocument();
    });
  });
});
