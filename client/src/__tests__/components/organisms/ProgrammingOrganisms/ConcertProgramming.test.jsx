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
        nom: 'Tes fr',
        description: 'fdfdfsd',
        photo: 'photo1.jpg',
        date: '20240804', // Format utilisé dans les données mockées
        heuredebut: '00:00:00',
        heurefin: '04:00:00',
        lieu: 'ScenePrincipale',
        type: 'Rock',
      }
    },
    {
      id: 2,
      acf: {
        nom: 'A',
        description: 'tset',
        photo: 'photo2.jpg',
        date: '20240803', // Format utilisé dans les données mockées
        heuredebut: '19:00:00',
        heurefin: '20:00:00',
        lieu: 'ScenePontNeuf',
        type: 'Rock',
      }
    },
    {
      id: 3,
      acf: {
        nom: 'Test',
        description: 'Test du filtre',
        photo: 'photo3.jpg',
        date: '20240803', // Format utilisé dans les données mockées
        heuredebut: '19:30:00',
        heurefin: '22:00:00',
        lieu: 'SceneMarais',
        type: 'Rock',
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
      expect(screen.getByText(/Tes fr/i)).toBeInTheDocument();
      expect(screen.getByText(/fdfdfsd/i)).toBeInTheDocument();
      
      // Count the number of elements with the text "Test"
      const testHeadings = screen.getAllByText(/Test/i);
      expect(testHeadings).toHaveLength(2); // Adjust this number to the expected count
    });
  });
  

  
});
