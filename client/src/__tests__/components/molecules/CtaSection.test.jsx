// src/__tests__/components/molecules/CTASection.test.js
import React from 'react';
import { render } from '@testing-library/react';
import CTASection from '../../../components/molecules/CTASection';
import Button from '../../../components/atoms/Button';

test('renders CTASection with title and buttons', () => {
  const ctas = [
    { label: 'Learn More', href: 'https://example.com', className: 'btn-primary' },
    { label: 'Contact Us', href: 'https://example.com/contact' },
  ];

  const { getByText } = render(<CTASection title="Call to Action" ctas={ctas} />);

  // Vérifie que le titre est présent
  expect(getByText(/call to action/i)).toBeInTheDocument();

  // Vérifie que les boutons sont présents
  expect(getByText(/learn more/i)).toBeInTheDocument();
  expect(getByText(/contact us/i)).toBeInTheDocument();
});
