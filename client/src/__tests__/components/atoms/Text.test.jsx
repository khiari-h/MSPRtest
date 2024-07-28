// src/__tests__/components/atoms/Text.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

test('renders text with correct tag and content', () => {
  const { getByText } = render(<Text content="Hello World" type="h1" className="header-text" />);
  
  // Vérifie que le texte est rendu avec la bonne balise et la classe CSS
  const textElement = getByText(/hello world/i);
  expect(textElement.tagName).toBe('H1');
  expect(textElement).toHaveClass('header-text');
});
