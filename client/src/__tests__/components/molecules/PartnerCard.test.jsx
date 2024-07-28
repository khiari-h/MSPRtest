// src/components/molecules/PartnerCard.test.js
import React from 'react';
import { render } from '@testing-library/react';
import PartnerCard from '../../../components/molecules/PartnersCard';

test('renders PartnerCard with logo, name, and link', () => {
  const { getByAltText, getByText } = render(
    <PartnerCard
      name="Partner Name"
      logo="logo.jpg"
      link="https://example.com"
    />
  );

  // Vérifie que le logo, le nom et le lien sont présents
  expect(getByAltText(/partner name/i)).toHaveAttribute('src', 'logo.jpg');
  expect(getByText(/partner name/i)).toBeInTheDocument();
  expect(getByText(/partner name/i).closest('a')).toHaveAttribute('href', 'https://example.com');
});
