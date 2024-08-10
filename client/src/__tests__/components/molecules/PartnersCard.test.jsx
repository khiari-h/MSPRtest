import React from 'react';
import { render, screen } from '@testing-library/react';
import PartnerCard from '../../../components/molecules/PartnersCard';

describe('PartnerCard Component', () => {
  const props = {
    name: 'Test Partner',
    logo: 'https://example.com/logo.jpg',
    link: 'https://example.com',
    description: 'Test Description',
  };

  // Test pour vérifier que le nom est rendu correctement
  test('renders the name correctly', () => {
    render(<PartnerCard {...props} />);
    const nameElement = screen.getByText(/Test Partner/i);
    expect(nameElement).toBeInTheDocument();
  });

  // Test pour vérifier que la description est rendue correctement
  test('renders the description correctly', () => {
    render(<PartnerCard {...props} />);
    const descriptionElement = screen.getByText(/Test Description/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  // Test pour vérifier que le logo est rendu correctement
  test('renders the logo correctly', () => {
    render(<PartnerCard {...props} />);
    const logoElement = screen.getByAltText(/Test Partner/i);
    expect(logoElement).toBeInTheDocument();
  });

  // Test pour vérifier que le lien est rendu correctement
  test('renders the link correctly', () => {
    render(<PartnerCard {...props} />);
    const linkElement = screen.getByText(/Visiter le site/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
  });

  // Test pour vérifier que les classes de base sont appliquées correctement
  test('applies base classes correctly', () => {
    const { container } = render(<PartnerCard {...props} />);
    expect(container.firstChild).toHaveClass('partner-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6 text-center');
  });

  // Test pour vérifier que le texte "No image" est rendu si le logo est absent
  test('renders "No image" if logo is not provided', () => {
    const propsWithoutLogo = { ...props, logo: null };
    render(<PartnerCard {...propsWithoutLogo} />);
    const noImageElement = screen.getByText(/No image/i);
    expect(noImageElement).toBeInTheDocument();
  });
});
