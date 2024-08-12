import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from '../../../config/axiosConfig';
import PartnersPage from '../../../components/pages/PartnersPage';

jest.mock('../../../config/axiosConfig');

describe('PartnersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();


  });

  test('renders the PartnersPage with data from API', async () => {
    const mockPartners = [
      {
        acf: {
          nom: 'Partner 1',
          logoUrl: 'https://example.com/logo1.png',
          lien: 'https://example.com/1',
          description: 'Description of Partner 1',
          categorie: 'Gold',
        },
      },
      {
        acf: {
          nom: 'Partner 2',
          logoUrl: 'https://example.com/logo2.png',
          lien: 'https://example.com/2',
          description: 'Description of Partner 2',
          categorie: 'Silver',
        },
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockPartners });

    await act(async () => {
      render(<PartnersPage />);
    });

    await waitFor(() => expect(screen.getByText('Partner 1')).toBeInTheDocument());

    expect(screen.getByText('Partner 1')).toBeInTheDocument();
    expect(screen.getByText('Partner 2')).toBeInTheDocument();
  });

  test('filters partners by category', async () => {
    const mockPartners = [
      {
        acf: {
          nom: 'Partner 1',
          logoUrl: 'https://example.com/logo1.png',
          lien: 'https://example.com/1',
          description: 'Description of Partner 1',
          categorie: 'Gold',
        },
      },
      {
        acf: {
          nom: 'Partner 2',
          logoUrl: 'https://example.com/logo2.png',
          lien: 'https://example.com/2',
          description: 'Description of Partner 2',
          categorie: 'Silver',
        },
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockPartners });

    await act(async () => {
      render(<PartnersPage />);
    });

    await waitFor(() => expect(screen.getByText('Partner 1')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Gold'));

    expect(screen.getByText('Partner 1')).toBeInTheDocument();
    expect(screen.queryByText('Partner 2')).not.toBeInTheDocument();
  });


});


