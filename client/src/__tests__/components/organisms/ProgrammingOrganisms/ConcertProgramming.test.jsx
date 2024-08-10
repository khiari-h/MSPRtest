import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from '../../../../config/axiosConfig';
import ConcertsProgramming from '../../../../components/organisms/ProgrammingOrganisms/ConcertProgramming';

jest.mock('../../../../config/axiosConfig');

describe('ConcertsProgramming Component', () => {
  const mockData = [
    {
      id: 1,
      acf: {
        nom: 'Concert 1',
        description: 'Description 1',
        photo: 'photo1.jpg',
        date: '20220101', // Format utilisé dans les données mockées
        heuredebut: '10:00',
        heurefin: '12:00',
        lieu: 'Lieu 1',
        type: 'Type 1',
      }
    },
    {
      id: 2,
      acf: {
        nom: 'Concert 2',
        description: 'Description 2',
        photo: 'photo2.jpg',
        date: '20220201', // Format utilisé dans les données mockées
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

  test('loads and displays concerts programming', async () => {
    render(<ConcertsProgramming />);
    
    // Affichage initial du message de chargement
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument();
    
    // Attendre que les concerts soient affichés
    await waitFor(() => {
      expect(screen.getByText(/Programmation des Concerts/i)).toBeInTheDocument();
      expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Concert 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
    });
  });

  test('filters concerts programming correctly', async () => {
    render(<ConcertsProgramming />);
    
    // Attendre que le texte "Programmation des Concerts" soit rendu
    await waitFor(() => {
      expect(screen.getByText(/Programmation des Concerts/i)).toBeInTheDocument();
    });

    // Assurez-vous que les éléments du filtre sont rendus
    await waitFor(() => {
      expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    });

    // Effectuer une sélection dans le filtre de date avec le format correct
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '20220101' } });
    
    // Attendre que les concerts filtrés apparaissent
    await waitFor(() => {
      expect(screen.getByText(/Concert 1/i)).toBeInTheDocument();
      expect(screen.queryByText(/Concert 2/i)).not.toBeInTheDocument();
    });
  });
});
