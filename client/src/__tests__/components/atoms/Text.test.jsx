import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text Component', () => {
  // Test pour vérifier que le texte est rendu avec la balise et le contenu corrects
  test('renders the text with the correct tag and content', () => {
    render(<Text content="Test Heading" type="h1" />);
    const headingElement = screen.getByText(/Test Heading/i);
    expect(headingElement.tagName.toLowerCase()).toBe('h1');
  });

  // Test pour vérifier que les classes appropriées sont appliquées en fonction du type
  test('applies the correct classes based on the type', () => {
    render(<Text content="Test Heading" type="h1" />);
    const headingElement = screen.getByText(/Test Heading/i);
    expect(headingElement).toHaveClass('font-concert-title text-black text-2xl font-bold');
  });

  // Test pour vérifier que des classes supplémentaires passées en props sont appliquées
  test('applies additional classes passed as props', () => {
    render(<Text content="Test Paragraph" type="p" className="custom-class" />);
    const paragraphElement = screen.getByText(/Test Paragraph/i);
    expect(paragraphElement).toHaveClass('font-concert-description text-black custom-class');
  });

  // Test pour vérifier que les liens sont rendus avec les classes appropriées
  test('renders a link with correct classes when type is "a"', () => {
    render(<Text content="Test Link" type="a" />);
    const linkElement = screen.getByText(/Test Link/i);
    expect(linkElement).toHaveClass('text-concert-accent hover:text-white');
  });
});
