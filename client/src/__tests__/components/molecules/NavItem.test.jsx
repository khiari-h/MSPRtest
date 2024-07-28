// src/components/molecules/NavItem.test.js
import React from 'react';
import { render } from '@testing-library/react';
import NavItem from '../../../components/molecules/NavItem';

test('renders NavItem with correct label and href', () => {
  const { getByText } = render(
    <NavItem label="Home" href="/" className="nav-link" />
  );

  // Vérifie que le lien a le bon texte et attribut href
  const linkElement = getByText(/home/i);
  expect(linkElement).toHaveAttribute('href', '/');
  expect(linkElement).toHaveClass('nav-link');
});
