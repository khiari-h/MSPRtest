import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PracticalInfo from '../../../components/organisms/PracticalInfo';
import practicalInfoData from '../../../data/practicalInfoData.json';

describe('PracticalInfo Component', () => {
  test('renders the practical info section with sections and FAQs', () => {
    render(<PracticalInfo />);

    // Vérifier que les sections sont correctement affichées
    practicalInfoData.sections.forEach((section) => {
      // Vérifier que le titre de chaque section est affiché
      expect(screen.getByText(section.title)).toBeInTheDocument();

      // Simuler un clic pour ouvrir la section
      fireEvent.click(screen.getByText(section.title));

      // Vérifier que le contenu de chaque section est affiché
      if (section.content) {
        expect(screen.getByText(new RegExp(section.content, 'i'))).toBeInTheDocument();
      }

      // Si une section a des éléments FAQ, vérifier chacun d'eux
      if (section.faqItems) {
        section.faqItems.forEach((item) => {
          // Simuler un clic pour ouvrir la question de la FAQ
          fireEvent.click(screen.getByText(item.question));

          // Vérifier que la question de la FAQ est affichée
          expect(screen.getByText(item.question)).toBeInTheDocument();
          // Vérifier que la réponse de la FAQ est affichée
          expect(screen.getByText(new RegExp(item.answer, 'i'))).toBeInTheDocument();
        });
      }
    });
  });
});
