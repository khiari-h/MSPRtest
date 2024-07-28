// __tests__/Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../../components/organisms/Footer';

describe('Footer', () => {
  test('renders about section', () => {
    render(<Footer />);
    expect(screen.getByText("À Propos de Nation Sounds")).toBeInTheDocument();
    expect(screen.getByText("Nation Sounds est un festival de musique qui célèbre la diversité et la créativité musicale. Rejoignez-nous pour une expérience inoubliable.")).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText("Mail: contact@nationsounds.com")).toBeInTheDocument();
    expect(screen.getByText("Adresse: 123 rue de la musique")).toBeInTheDocument();
    expect(screen.getByText("Téléphone: 01 34 56 78 90")).toBeInTheDocument();
  });

  test('renders legal information links', () => {
    render(<Footer />);
    expect(screen.getByText("Mentions légales")).toBeInTheDocument();
    expect(screen.getByText("Politique de confidentialité")).toBeInTheDocument();
    expect(screen.getByText("Conditions générales de vente")).toBeInTheDocument();
    expect(screen.getByText("Politique de cookies")).toBeInTheDocument();
    expect(screen.getByText("RGPD")).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });
});
