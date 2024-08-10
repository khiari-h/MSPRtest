import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from '../../../components/molecules/Accordion';

describe('Accordion Component', () => {
  // Test pour vérifier que le titre de l'accordéon est rendu correctement
  test('renders the accordion title', () => {
    render(<Accordion title="Test Title">Test Content</Accordion>);
    const titleElement = screen.getByText(/Test Title/i);
    expect(titleElement).toBeInTheDocument();
  });

  // Test pour vérifier que le contenu de l'accordéon est masqué par défaut
  test('hides content by default', () => {
    render(<Accordion title="Test Title">Test Content</Accordion>);
    const contentElement = screen.queryByText(/Test Content/i);
    expect(contentElement).not.toBeInTheDocument();
  });

  // Test pour vérifier que le contenu de l'accordéon s'affiche lorsqu'on clique sur le titre
  test('shows content when the title is clicked', () => {
    render(<Accordion title="Test Title">Test Content</Accordion>);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    const contentElement = screen.getByText(/Test Content/i);
    expect(contentElement).toBeInTheDocument();
  });

  // Test pour vérifier que le contenu de l'accordéon est masqué lorsqu'on reclique sur le titre
  test('hides content when the title is clicked again', () => {
    render(<Accordion title="Test Title">Test Content</Accordion>);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement); // Ouvrir l'accordéon
    fireEvent.click(buttonElement); // Fermer l'accordéon
    const contentElement = screen.queryByText(/Test Content/i);
    expect(contentElement).not.toBeInTheDocument();
  });
});
