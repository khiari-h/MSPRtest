import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

    // Ici, on utilise `findAllByText` pour éviter les collisions entre les options du select et les titres des concerts.
    const concertElements = await screen.findAllByText('Concert 1');
    expect(concertElements).toHaveLength(2);  // Cela s'assure que les deux occurrences sont trouvées
    expect(screen.getByText('Concert 2')).toBeInTheDocument();
  });

  test('filters concerts based on selected group', async () => {
    render(<ConcertsDetailsPage />);

    await waitFor(() => screen.findByText('Concert 1'));

    fireEvent.change(screen.getByLabelText('Groupe'), { target: { value: 'Concert 1' } });

    // Assurez-vous de bien utiliser `queryAllByText` pour vérifier la présence multiple d'un élément.
    expect(screen.queryAllByText('Concert 2')).toHaveLength(0);
    expect(screen.getAllByText('Concert 1')).toHaveLength(2);
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Erreur lors de la récupération des concerts!'));

    render(<ConcertsDetailsPage />);

    // En cas d'erreur, nous vérifions que le message est affiché correctement.
    expect(await screen.findByText(/Erreur lors de la récupération des concerts!/i)).toBeInTheDocument();
  });
});
