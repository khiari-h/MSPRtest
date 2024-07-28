// src/components/molecules/InfoCard.test.js
import React from 'react';
import { render } from '@testing-library/react';
import InfoCard from '../../../components/molecules/InfoCard';

test('renders InfoCard with correct information and link', () => {
  const { getByText, getByAltText } = render(
    <InfoCard
      title="Info Title"
      description="Info description text"
      image="image.jpg"
      additionalInfo="Additional information"
      link="https://example.com"
      type="schedule"
    />
  );

  // Vérifie que les informations sont présentes
  expect(getByText(/info title/i)).toBeInTheDocument();
  expect(getByText(/info description text/i)).toBeInTheDocument();
  expect(getByText(/additional information/i)).toBeInTheDocument();
  expect(getByAltText(/image de info title/i)).toHaveAttribute('src', 'image.jpg');
  expect(getByText(/en savoir plus/i)).toHaveAttribute('href', 'https://example.com');
});
