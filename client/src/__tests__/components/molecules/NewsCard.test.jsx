import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from '../../../components/molecules/NewsCard';

describe('NewsCard Component', () => {
  const props = {
    title: 'Test Title',
    description: 'Test Description',
  };

  // Test pour vérifier que le titre est rendu correctement
  test('renders the title correctly', () => {
    render(<NewsCard {...props} />);
    const titleElement = screen.getByText(/Test Title/i);
    expect(titleElement).toBeInTheDocument();
  });

  // Test pour vérifier que la description est rendue correctement
  test('renders the description correctly', () => {
    render(<NewsCard {...props} />);
    const descriptionElement = screen.getByText(/Test Description/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  // Test pour vérifier que les classes de base sont appliquées correctement
  test('applies base classes correctly', () => {
    const { container } = render(<NewsCard {...props} />);
    expect(container.firstChild).toHaveClass('bg-white rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col m-4 border-l-4 border-concert-accent p-4');
  });
});
