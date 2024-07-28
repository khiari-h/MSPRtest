// src/__tests__/components/molecules/Accordion.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Accordion from '../../../components/molecules/Accordion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

test('renders accordion with title and toggles content visibility', () => {
  const { getByText, queryByText } = render(
    <Accordion title="Accordion Title">
      <p>Accordion Content</p>
    </Accordion>
  );

  // Vérifie que le titre est présent
  expect(getByText(/accordion title/i)).toBeInTheDocument();
  
  // Vérifie que le contenu n'est pas visible au départ
  expect(queryByText(/accordion content/i)).toBeNull();

  // Simule un clic sur le bouton pour ouvrir l'accordéon
  fireEvent.click(getByText(/accordion title/i));

  // Vérifie que le contenu est maintenant visible
  expect(getByText(/accordion content/i)).toBeInTheDocument();

  // Simule un clic pour fermer l'accordéon
  fireEvent.click(getByText(/accordion title/i));

  // Vérifie que le contenu n'est plus visible
  expect(queryByText(/accordion content/i)).toBeNull();
});
