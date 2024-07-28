import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '../../../components/organisms/HeroSection';

describe('HeroSection', () => {
  test('renders background image with correct style', () => {
    render(<HeroSection />);
    const heroSection = screen.getByLabelText(/Hero section avec un message de bienvenue et un appel à l'action pour acheter des billets/i);
    expect(heroSection).toHaveStyle('backgroundImage: url(/concert2.jpg)');
  });
});
