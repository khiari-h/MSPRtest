import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoCard from '../../../components/molecules/InfoCard';

describe('InfoCard Component', () => {
  const props = {
    title: 'Test Title',
    description: 'Test Description',
    image: 'https://example.com/image.jpg',
    additionalInfo: 'Test Additional Info',
    link: 'https://example.com',
    type: 'schedule',
  };

  // Test pour vérifier que le titre, la description et l'image sont rendus correctement
  test('renders the title, description, and image', () => {
    render(<InfoCard {...props} />);
    const titleElement = screen.getByText(/Test Title/i);
    const descriptionElement = screen.getByText(/Test Description/i);
    const imgElement = screen.getByAltText(/Test Title/i);
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  // Test pour vérifier que les informations supplémentaires sont rendues si elles sont fournies
  test('renders additional info if provided', () => {
    render(<InfoCard {...props} />);
    const additionalInfoElement = screen.getByText(/Test Additional Info/i);
    expect(additionalInfoElement).toBeInTheDocument();
  });

  // Test pour vérifier que le lien est rendu si fourni
  test('renders link if provided', () => {
    render(<InfoCard {...props} />);
    const linkElement = screen.getByText(/En savoir plus/i);
    expect(linkElement).toBeInTheDocument();
  });

  // Test pour vérifier que la classe de bordure personnalisée est appliquée pour le type 'schedule'
  test('applies custom border class if type is schedule', () => {
    const { container } = render(<InfoCard {...props} />);
    expect(container.firstChild).toHaveClass('border-custom-blue-500');
  });
});
