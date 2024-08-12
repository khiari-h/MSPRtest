import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../../../components/atoms/Filter';

describe('Filter Component', () => {
  const mockData = [
    { date: '2024-08-15', heuredebut: '10:00', lieu: 'Salle de Danse', type: 'Danse' },
    { date: '2024-08-16', heuredebut: '14:00', lieu: 'Atelier des Arts', type: 'Peinture' },
  ];
  const filterKeys = ['date', 'heuredebut', 'lieu', 'type'];
  const mockHandleFilterChange = jest.fn();
  const mockResetFilters = jest.fn();

  beforeEach(() => {
    render(
      <Filter
        data={mockData}
        filters={{}}
        filterKeys={filterKeys}
        handleFilterChange={mockHandleFilterChange}
        resetFilters={mockResetFilters}
      />
    );
  });

  test('renders filter options correctly', () => {
    // Vérifier que les options de filtre pour les labels définis sont présentes
    expect(screen.getByText(/Dates/i)).toBeInTheDocument();
    expect(screen.getByText(/Heures/i)).toBeInTheDocument();
    expect(screen.getByText(/Lieux/i)).toBeInTheDocument();
    expect(screen.getByText(/Types/i)).toBeInTheDocument();
  
    // Vérifier que les options sont générées à partir des données mock
    expect(screen.getByText('2024-08-15')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('Salle de Danse')).toBeInTheDocument();
    expect(screen.getByText('Danse')).toBeInTheDocument();
  });

 

  test('calls handleFilterChange when a filter is changed', () => {
    // Trouver le select contenant 'Dates' et simuler un changement
    fireEvent.change(screen.getByText(/Dates/i).closest('select'), { target: { value: '2024-08-15' } });
  
    // Vérifier que la fonction handleFilterChange est appelée avec les bons arguments
    expect(mockHandleFilterChange).toHaveBeenCalledWith('date', '2024-08-15');
  });
  
  
});
