import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PracticalInfo from '../../../components/organisms/PracticalInfo';
import practicalInfoData from '../../../data/practicalInfoData.json';

// Mock data
jest.mock('../../../data/practicalInfoData.json', () => ({
  sections: [
    {
      title: 'Informations Générales',
      content: 'Voici quelques informations générales.',
      faqItems: [
        {
          question: 'Quelle est la date du festival ?',
          answer: 'Le festival aura lieu du 10 au 12 juin.'
        },
        {
          question: 'Où se déroule le festival ?',
          answer: 'Le festival se déroule au Parc des Expositions.'
        }
      ]
    },
    {
      title: 'Billetterie',
      content: 'Toutes les informations concernant la billetterie.',
      faqItems: [
        {
          question: 'Comment acheter des billets ?',
          answer: 'Vous pouvez acheter des billets en ligne sur notre site.'
        }
      ]
    }
  ]
}));

describe('PracticalInfo Component', () => {
  test('renders the practical info section with sections and FAQs', () => {
    render(<PracticalInfo />);

    // Check that the main title is present
    expect(screen.getByText('Infos Pratiques et FAQ')).toBeInTheDocument();

    // Check that sections are rendered and initially collapsed
    practicalInfoData.sections.forEach((section) => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
      expect(screen.queryByText(section.content)).not.toBeInTheDocument(); // Content should be hidden initially
    });

    // Expand the first section and check its content
    fireEvent.click(screen.getByText('Informations Générales'));
    expect(screen.getByText('Voici quelques informations générales.')).toBeInTheDocument();

    // Check that FAQs are displayed within the expanded section
    practicalInfoData.sections[0].faqItems.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    });

    // Collapse the first section and check that the content is hidden again
    fireEvent.click(screen.getByText('Informations Générales'));
    expect(screen.queryByText('Voici quelques informations générales.')).not.toBeInTheDocument();
  });
});
