import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from '../../../../config/axiosConfig';
import Workshops from '../../../../components/organisms/ProgrammingOrganisms/Workshops';

jest.mock('../../../../config/axiosConfig');

describe('Workshops Component', () => {
  const mockData = [
    {
      id: 1,
      name: 'Atelier de Danse',
      description: 'Un atelier pour apprendre les bases de la danse contemporaine.',
      date: '2024-08-15',
      time: '10:00:00',
      venue: 'Salle de Danse',
      type: 'Danse',
      duration: '2',
    },
    {
      id: 2,
      name: 'Atelier de Peinture',
      description: "Découverte des techniques de peinture à l'huile.",
      date: '2024-08-16',
      time: '14:00:00',
      venue: 'Atelier des Arts',
      type: 'Peinture',
      duration: '3',
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
  });

  test('loads and displays workshops', async () => {
    render(<Workshops />);

    expect(screen.getByText(/Chargement.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Ateliers/i)).toBeInTheDocument();
    });

    const headings = screen.getAllByRole('heading', { name: /Atelier de Danse/i });
    expect(headings).toHaveLength(1);

    expect(screen.getByRole('heading', { name: /Atelier de Peinture/i })).toBeInTheDocument();
  });

  test('displays the registration form', async () => {
    render(<Workshops />);

    await waitFor(() => expect(screen.queryByText(/Chargement.../i)).not.toBeInTheDocument());

    const firstNameInput = screen.getByPlaceholderText('Prénom');
    const lastNameInput = screen.getByPlaceholderText('Nom');
    const emailInput = screen.getByPlaceholderText('Email');
    const workshopSelect = screen.getByText(/Sélectionnez un atelier/i);

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(workshopSelect).toBeInTheDocument();
  });

  test('paginates workshops correctly', async () => {
    const extraWorkshops = [
      {
        id: 3,
        name: 'Atelier de Danse 3',
        description: 'Un atelier pour apprendre les bases de la danse contemporaine.',
        date: '2024-08-17',
        time: '11:00:00',
        venue: 'Salle de Danse',
        type: 'Danse',
        duration: '2',
      },
      {
        id: 4,
        name: 'Atelier de Peinture 4',
        description: "Découverte des techniques de peinture à l'huile.",
        date: '2024-08-18',
        time: '15:00:00',
        venue: 'Atelier des Arts',
        type: 'Peinture',
        duration: '3',
      },
      {
        id: 5,
        name: 'Atelier de Danse 5',
        description: 'Un atelier pour apprendre les bases de la danse contemporaine.',
        date: '2024-08-19',
        time: '09:00:00',
        venue: 'Salle de Danse',
        type: 'Danse',
        duration: '2',
      },
      {
        id: 6,
        name: 'Atelier de Peinture 6',
        description: "Découverte des techniques de peinture à l'huile.",
        date: '2024-08-20',
        time: '16:00:00',
        venue: 'Atelier des Arts',
        type: 'Peinture',
        duration: '3',
      },
      {
        id: 7,
        name: 'Atelier de Danse 7',
        description: 'Un atelier pour apprendre les bases de la danse contemporaine.',
        date: '2024-08-21',
        time: '12:00:00',
        venue: 'Salle de Danse',
        type: 'Danse',
        duration: '2',
      },
    ];
  
    axios.get.mockResolvedValue({ data: [...mockData, ...extraWorkshops] });
  
    render(<Workshops />);
  
    await waitFor(() => expect(screen.getByText(/Ateliers/i)).toBeInTheDocument());
  
    const workshopsOnFirstPage = screen.getAllByRole('heading', { name: /Atelier de/i });
    expect(workshopsOnFirstPage.length).toBe(6); // Assuming 6 workshops per page
  
    fireEvent.click(screen.getByText('2')); // Clicking on the second page button
  
    const workshopsOnSecondPage = screen.getAllByRole('heading', { name: /Atelier de/i });
    expect(workshopsOnSecondPage.length).toBe(1); // Only 1 workshop left on the second page
  });
  
});
