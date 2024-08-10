import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

    render(<PartnersPage />);

    // Attendre que les partenaires soient rendus
    await waitFor(() => expect(screen.getByText('Partner 1')).toBeInTheDocument());

    // Vérifie que les partenaires sont bien affichés
    expect(screen.getByText('Partner 1')).toBeInTheDocument();
    expect(screen.getByText('Partner 2')).toBeInTheDocument();
  });

  test('displays an error message when API request fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<PartnersPage />);

    // Attendre que l'erreur soit affichée
    await waitFor(() => expect(screen.getByText('Erreur lors de la récupération des données.')).toBeInTheDocument());
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

    render(<PartnersPage />);

    // Attendre que les partenaires soient rendus
    await waitFor(() => expect(screen.getByText('Partner 1')).toBeInTheDocument());

    // Cliquer sur le filtre "Gold"
    fireEvent.click(screen.getByText('Gold'));

    // Vérifie que seul le partenaire Gold est affiché
    expect(screen.getByText('Partner 1')).toBeInTheDocument();
    expect(screen.queryByText('Partner 2')).not.toBeInTheDocument();
  });

  test('handles pagination correctly', async () => {
    const mockPartners = Array.from({ length: 12 }, (_, i) => ({
      acf: {
        nom: `Partner ${i + 1}`,
        logoUrl: `https://example.com/logo${i + 1}.png`,
        lien: `https://example.com/${i + 1}`,
        description: `Description of Partner ${i + 1}`,
        categorie: 'Gold',
      },
    }));

    axios.get.mockResolvedValueOnce({ data: mockPartners });

    render(<PartnersPage />);

    // Attendre que les partenaires soient rendus
    await waitFor(() => expect(screen.getByText('Partner 1')).toBeInTheDocument());

    // Vérifie que seuls les premiers partenaires sont affichés
    expect(screen.getByText('Partner 1')).toBeInTheDocument();
    expect(screen.getByText('Partner 6')).toBeInTheDocument();
    expect(screen.queryByText('Partner 7')).not.toBeInTheDocument();

    // Cliquer sur la page 2
    fireEvent.click(screen.getByText('2'));

    // Vérifie que les partenaires de la deuxième page sont affichés
    expect(screen.getByText('Partner 7')).toBeInTheDocument();
    expect(screen.getByText('Partner 12')).toBeInTheDocument();
    expect(screen.queryByText('Partner 1')).not.toBeInTheDocument();
  });

  test('renders CTA button that triggers email client', () => {
    render(<PartnersPage />);

    const ctaButton = screen.getByText('Envoyez-nous un email');

    expect(ctaButton).toBeInTheDocument();

    // Vérifier que la redirection mailto est correctement définie
    expect(ctaButton.closest('button')).toBeInTheDocument();

    fireEvent.click(ctaButton);
    // Verifier si la fonction window.location.href a été appelée
    expect(window.location.href).toBe('mailto:partenariats@nationsounds.com');
  });
});
