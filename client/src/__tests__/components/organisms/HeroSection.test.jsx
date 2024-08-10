import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '../../../components/organisms/HeroSection';

describe('HeroSection Component', () => {
  test('renders the hero section with welcome message and call to action', () => {
    render(<HeroSection />);

    // Vérifie que le message de bienvenue est présent
    expect(screen.getByText('Bienvenue au Festival Nation Sounds')).toBeInTheDocument();
    expect(screen.getByText('Rejoignez-nous pour une expérience inoubliable')).toBeInTheDocument();

    // Vérifie que le bouton "Acheter des billets" est présent
    const button = screen.getByRole('link', { name: /acheter des billets/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'https://www.site-de-billetterie.com');
  });
});
