import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../../components/organisms/Header';

describe('Header Component', () => {
  test('renders the header with navigation items', () => {
    render(<Header />);
    
    // Vérifie que le logo est présent
    expect(screen.getByAltText('Festival Logo')).toBeInTheDocument();
    
    // Vérifie que les éléments de navigation sont présents
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Programmation')).toBeInTheDocument();
    expect(screen.getByText('Concerts')).toBeInTheDocument();
    expect(screen.getByText('Partenaires')).toBeInTheDocument();
    expect(screen.getByText('Actualités')).toBeInTheDocument();
  });

  test('toggles the mobile menu', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /ouvrir le menu/i });
    expect(menuButton).toBeInTheDocument();

    // Simule le clic sur le bouton du menu mobile pour l'ouvrir
    fireEvent.click(menuButton);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // Simule le clic sur le bouton du menu mobile pour le fermer
    fireEvent.click(menuButton);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
