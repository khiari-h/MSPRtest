import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import PartnersPage from '../../../components/pages/PartnersPage';
import { jest } from '@jest/globals';

jest.mock('axios');

describe('PartnersPage', () => {
  test('rend le PartnersPageTemplate avec les partenaires permanents et nouveaux', async () => {
    // Mock de la réponse de l'API
    axios.get.mockResolvedValue({
      data: [
        { acf: { category: 'permanent', name: 'Partner 1', logo: 'logo1.jpg', link: '#', description: 'Description 1' } },
        { acf: { category: 'new', name: 'Partner 2', logo: 'logo2.jpg', link: '#', description: 'Description 2' } }
      ]
    });

    render(<PartnersPage />);

    await waitFor(() => {
      // Vérifier les sections de partenaires
      expect(screen.getByText(/Partenaires Permanents/i)).toBeInTheDocument();
      expect(screen.getByText(/Nouveaux Partenaires/i)).toBeInTheDocument();
      expect(screen.getByText(/Vous souhaitez devenir partenaire ?/i)).toBeInTheDocument();

      // Vérifier les partenaires
      expect(screen.getByText(/Partner 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Partner 2/i)).toBeInTheDocument();
    });
  });

  test('affiche un message de chargement ou d\'erreur selon l\'état', async () => {
    // Test pour le chargement
    axios.get.mockResolvedValueOnce({ data: [] }); // Mock de chargement
    render(<PartnersPage />);
    await waitFor(() => {
      expect(screen.getByText(/Chargement.../i)).toBeInTheDocument();
    });

    // Test pour l'erreur
    axios.get.mockRejectedValueOnce(new Error('Erreur')); // Mock d'erreur
    render(<PartnersPage />);
    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de la récupération des données./i)).toBeInTheDocument();
    });
  });
});
