import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from '../../../../config/axiosConfig';
import ArtistMeeting from '../../../../components/organisms/ProgrammingOrganisms/ArtistMeeting';

jest.mock('../../../../config/axiosConfig');

describe('ArtistMeeting Component', () => {
  const mockData = [
    {
      id: 1,
      acf: {
        nom: 'Artiste 1',
        description: 'Description 1',
        photo: 'photo1.jpg',
        date: '20220101',
        heuredebut: '10:00',
        heurefin: '12:00',
        lieu: 'Lieu 1',
        type: 'Type 1',
      }
    },
    {
      id: 2,
      acf: {
        nom: 'Artiste 2',
        description: 'Description 2',
        photo: 'photo2.jpg',
        date: '20220201',
        heuredebut: '14:00',
        heurefin: '16:00',
        lieu: 'Lieu 2',
        type: 'Type 2',
      }
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
  });

  // Test pour vérifier que les données sont chargées et affichées correctement
  test('loads and displays artist meetings', async () => {
    render(<ArtistMeeting />);
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Rencontres avec les Artistes/i)).toBeInTheDocument());
    expect(screen.getByText(/Artiste 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Artiste 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
  });

  // Test pour vérifier que les filtres fonctionnent correctement
  test('filters artist meetings correctly', async () => {
    render(<ArtistMeeting />);
    await waitFor(() => expect(screen.getByText(/Rencontres avec les Artistes/i)).toBeInTheDocument());

    // Appliquer un filtre par date
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '01/01/2022' } });
    await waitFor(() => {
      expect(screen.getByText(/Artiste 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Artiste 2/i)).not.toBeInTheDocument();
    });

    // Appliquer un filtre par heure de début
    fireEvent.change(screen.getByLabelText(/Heure de début/i), { target: { value: '14:00' } });
    await waitFor(() => {
      expect(screen.getByText(/Artiste 2/i)).toBeInTheDocument();
      expect(screen.queryByText(/Artiste 1/i)).not.toBeInTheDocument();
    });

    // Appliquer un filtre par lieu
    fireEvent.change(screen.getByLabelText(/Lieu/i), { target: { value: 'Lieu 1' } });
    await waitFor(() => {
      expect(screen.getByText(/Artiste 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Artiste 2/i)).not.toBeInTheDocument();
    });

    // Appliquer un filtre par type
    fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: 'Type 2' } });
    await waitFor(() => {
      expect(screen.getByText(/Artiste 2/i)).toBeInTheDocument();
      expect(screen.queryByText(/Artiste 1/i)).not.toBeInTheDocument();
    });
  });
});
