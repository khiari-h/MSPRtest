import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer';
import axios from '../../../config/axiosConfig';

// Mocking axios to prevent real API calls
jest.mock('../../../config/axiosConfig');

describe('Footer Component', () => {
  test('renders the footer with correct content', () => {
    render(<Footer />);
    
    // Vérifie que les sections du footer sont présentes
    expect(screen.getByText('À Propos de Nation Sounds')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Informations légales')).toBeInTheDocument();
    expect(screen.getByText('Réseaux sociaux')).toBeInTheDocument();

    // Vérifie que les informations de contact sont présentes
    expect(screen.getByText(/contact@nationsounds.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123 rue de la musique/i)).toBeInTheDocument();
    expect(screen.getByText(/01 34 56 78 90/i)).toBeInTheDocument();

    // Vérifie que les liens des réseaux sociaux sont présents
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Snapchat')).toBeInTheDocument();
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
  });

  test('renders legal information links', () => {
    render(<Footer />);
    
    // Vérifie que les liens des informations légales sont présents
    expect(screen.getByText('Mentions légales')).toBeInTheDocument();
    expect(screen.getByText('Politique de confidentialité')).toBeInTheDocument();
    expect(screen.getByText('Conditions générales de vente')).toBeInTheDocument();
    expect(screen.getByText('Politique de cookies')).toBeInTheDocument();
    expect(screen.getByText('RGPD')).toBeInTheDocument();
  });

  test('allows users to subscribe to the newsletter', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Inscription réussie!' } });

    render(<Footer />);

    const firstNameInput = screen.getByPlaceholderText('Votre prénom');
    const lastNameInput = screen.getByPlaceholderText('Votre nom');
    const emailInput = screen.getByPlaceholderText('Votre email');
    const subscribeButton = screen.getByText("S'inscrire");

    // Simuler l'entrée des informations et la soumission du formulaire
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    // Vérifier que l'API a été appelée avec les bonnes données
    expect(axios.post).toHaveBeenCalledWith('/api/newsletter', {
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@example.com'
    });

    // Attendre que le statut soit mis à jour
    const successMessage = await screen.findByText('Inscription réussie!');
    expect(successMessage).toBeInTheDocument();

    // Vérifier la classe pour le succès
    expect(successMessage).toHaveClass('text-light-blue');

    // Attendre que le message disparaisse après 3 secondes
    await waitFor(() => {
      expect(screen.queryByText('Inscription réussie!')).not.toBeInTheDocument();
    }, { timeout: 4000 }); // timeout de 4 secondes pour être sûr que le message a disparu
  });

  test('shows error message if subscription fails', async () => {
    axios.post.mockRejectedValue(new Error('Erreur lors de l\'inscription.'));

    render(<Footer />);

    const firstNameInput = screen.getByPlaceholderText('Votre prénom');
    const lastNameInput = screen.getByPlaceholderText('Votre nom');
    const emailInput = screen.getByPlaceholderText('Votre email');
    const subscribeButton = screen.getByText("S'inscrire");

    // Simuler l'entrée des informations et la soumission du formulaire
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    // Attendre que le message d'erreur soit affiché
    const errorMessage = await screen.findByText('Erreur lors de l\'inscription.');
    expect(errorMessage).toBeInTheDocument();

    // Vérifier la classe pour l'erreur
    expect(errorMessage).toHaveClass('text-error-red');

    // Attendre que le message disparaisse après 3 secondes
    await waitFor(() => {
      expect(screen.queryByText('Erreur lors de l\'inscription.')).not.toBeInTheDocument();
    }, { timeout: 4000 }); // timeout de 4 secondes pour être sûr que le message a disparu
  });
});
