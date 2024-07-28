// __tests__/Header.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../../components/organisms/Header';

describe('Header', () => {
  test('renders logo and navigation links', () => {
    render(<Header />);
    expect(screen.getByAltText('Festival Logo')).toBeInTheDocument();
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Programmation')).toBeInTheDocument();
    expect(screen.getByText('Artistes')).toBeInTheDocument();
    expect(screen.getByText('Partenaires')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('toggles mobile menu visibility', () => {
    render(<Header />);
    const mobileMenuButton = screen.getByLabelText('Ouvrir le menu');
    fireEvent.click(mobileMenuButton);
    expect(screen.getByRole('menu')).toBeVisible();
    fireEvent.click(screen.getByLabelText('Fermer le menu'));
    expect(screen.queryByRole('menu')).toBeNull();
  });
});
